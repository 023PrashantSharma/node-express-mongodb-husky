/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../controller/super-admin/userController');
const {
  PLATFORM, USER_TYPES 
} =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/super-admin/user/me').get(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),userController.getLoggedInUserInfo);
router.route('/super-admin/user/create').post(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.addUser);
router.route('/super-admin/user/list').post(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.findAllUser);
router.route('/super-admin/user/count').post(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.getUserCount);
router.route('/super-admin/user/:id').get(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.getUser);
router.route('/super-admin/user/update/:id').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.updateUser);    
router.route('/super-admin/user/partial-update/:id').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.partialUpdateUser);
router.route('/super-admin/user/softDelete/:id').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.softDeleteUser);
router.route('/super-admin/user/softDeleteMany').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.softDeleteManyUser);
router.route('/super-admin/user/addBulk').post(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.bulkInsertUser);
router.route('/super-admin/user/updateBulk').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.bulkUpdateUser);
router.route('/super-admin/user/delete/:id').delete(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.deleteUser);
router.route('/super-admin/user/deleteMany').post(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),checkRolePermission,userController.deleteManyUser);
router.route('/super-admin/user/change-password').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),userController.changePassword);
router.route('/super-admin/user/update-profile').put(auth(PLATFORM.WEB, USER_TYPES.SUPER_ADMIN),userController.updateProfile);

module.exports = router;
