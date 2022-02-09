const express = require('express')
const router = express.Router()
const {
       userValidation
} = require('../../middlewares/validationMiddlewares')
const {
  usersMiddleware,
} = require('../../middlewares/usersMiddlewares')

const {
    registrationController,
    loginController,
    logoutController,
    currentController
} = require('../../controllers/usersController')

const {asyncWrapper} = require('../../helpers/apiHelpers')



router.post('/register', userValidation ,  asyncWrapper(registrationController))
router.get('/login', userValidation ,  asyncWrapper(loginController))
router.post('/logout', usersMiddleware, asyncWrapper(logoutController))
router.get('/current',usersMiddleware, asyncWrapper(currentController))

module.exports = router