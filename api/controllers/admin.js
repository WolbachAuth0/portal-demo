const responseFormatter = require('./../middleware/responseFormatter')
const scopes = [
  'read:clients',
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

function formatClient(client) {
  return {
    client_id: client.client_id,
    app_type: client.app_type,
    tenant: client.tenant,
    name: client.name,
    logo_uri: client.logo_uri,
    // allowed_clients: client.allowed_clients,
    // callbacks: client.callbacks,
    client_metadata: client.client_metadata
  }
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
      data: data.map(formatClient)
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
    const data = await management.clients.get({ client_id })
    const payload = {
      status: 200,
      data: formatClient(data)
    }
    const json = responseFormatter(req, res, payload)
    res.status(payload.status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}
