const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const auth = require('../middleware/auth');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', auth.verifytoken, userController.getUser);
//this is when user token is verified and autheticated(auth.verifytoken), we allow them to access the endpoint(usercontroller.getuser)
userRouter.put('/profile', auth.verifytoken, userController.updateUser);
userRouter.delete('/profile', auth.verifytoken, userController.deleteUser);

userRouter.get('/logout', auth.verifytoken, userController.logout);
module.exports = userRouter;