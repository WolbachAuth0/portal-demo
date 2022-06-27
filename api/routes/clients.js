const router = require('express').Router()
const { verifyJWT } = require('./../middleware/auth')
const controller = require('./../controllers/clients')

module.exports = router

router
  .route('/:client_id')
  .all(verifyJWT)           // validate token, but don't look for scopes
  .get(controller.getByID)

router
  .route('/')
  .all(verifyJWT)           // validate token, but don't look for scopes
  .get(controller.list)
