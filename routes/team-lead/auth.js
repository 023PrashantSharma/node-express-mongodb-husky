/**
 * auth.js
 * @description :: routes of authentication APIs
 */

const express =  require('express');
const router  =  express.Router();
const auth = require('../../middleware/auth');
const authController =  require('../../controller/employee/authController');
const {
  PLATFORM, USER_TYPES 
} =  require('../../constants/authConstant');   

router.route('/register').post(authController.register);
router.post('/login',authController.login);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/validate-otp').post(authController.validateResetPasswordOtp);
router.route('/reset-password').put(authController.resetPassword);
router.route('/logout').post(auth(PLATFORM.WEB, USER_TYPES.EMPLOYEE), authController.logout);
module.exports = router;