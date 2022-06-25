const responseFormatter = require('./../middleware/responseFormatter')
const { verifyJWT, checkJWTPermissions } = require('./../middleware/auth')

const controller = require('./../controllers/clients')
module.exports = router

router
  .route('/:client_id')
  .all(verifyJWT)
  .get(controller.getByID)

router
  .route('/')
  .all(verifyJWT)
  .get(controller.list)