const responseFormatter = require('./../middleware/responseFormatter')
const scopes = [
  'read:clients',
  'read:client_keys',
  'read:client_credentials',
  'read:client_summary'
]
const management = require('./../models/management')(scopes)

module.exports = {
  list,
  getByID,
}

function handleError (req, res, error) {
  const payload = {
    status: parseInt(error.statusCode) || 500,
    data: {
      message: error.message || 'An error occurred.',
    }
  }
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

// roles
async function list (req, res) {
  try {
    const options = {
      per_page: parseInt(req.query.limit) || 50,
      page: parseInt(req.query.page) || 0
    }
    const data = await management.clients.getAll(options)
    const payload = {
      status: 200,
      data 
    }
    const json = responseFormatter(req, res, payload)
    res.status(payload.status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function getByID (req, res) {
  try {
    const client_id = req.params.client_id
    const fields = 'client_id, name, description, app_type'
    const data = await management.clients.get({ client_id, fields })
    const payload = {
      status: 200,
      data 
    }
    const json = responseFormatter(req, res, payload)
    res.status(payload.status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

