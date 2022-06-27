const router = require('express').Router()
const { verifyJWT, checkJWTPermissions } = require('./../middleware/auth')
const controller = require('./../controllers/admin')

module.exports = router

router
  .route('/users/:user_id')
  .all(verifyJWT)
  .all(checkJWTPermissions([ 'administrator' ]))
  .get(controller.getByID)

router
  .route('/users')
  .all(verifyJWT)
  .all(checkJWTPermissions([ 'administrator' ]))
  .get(controller.list)

router
  .route('/users/:user_id/metadata')
  .all(verifyJWT)
  .all(checkJWTPermissions([ 'administrator' ]))
  .put(controller.getByID)