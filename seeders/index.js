/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      password: 'tRGyeP7QRgtYinN',
      isDeleted: false,
      username: 'developer',
      email: 'developer@yopmail.com',
      isActive: true,
      userType: authConstant.USER_TYPES.DEVELOPER,
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(
      User,
      { username: 'SUPER_ADMIN' },
      userToBeInserted,
      { upsert: true }
    );
    userToBeInserted = {
      password: 'zcB7oXQrNxQuNIs',
      isDeleted: false,
      username: 'admin',
      email: 'admin@yopmail.com',
      isActive: true,
      userType: authConstant.USER_TYPES.EMPLOYEE,
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(
      User,
      { username: 'SUPER_ADMIN' },
      userToBeInserted,
      { upsert: true }
    );
    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = ['DEVELOPER', 'SUPER_ADMIN', 'EMPLOYEE', 'TEAM_LEAD', 'HR'];
    const insertedRoles = await dbService.findMany(Role, { code: { $in: roles.map((role) => role.toUpperCase()) }, });
    const rolesToInsert = [];
    roles.forEach((role) => {
      if (
        !insertedRoles.find(
          (insertedRole) => insertedRole.code === role.toUpperCase()
        )
      ) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1,
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach((route) => {
        routeName = `${replaceAll(route.path.toLowerCase(), '/', '_')}`;
        route.methods.forEach((method) => {
          routeObj = dbRoutes.find(
            (dbRoute) =>
              dbRoute.route_name === routeName && dbRoute.method === method
          );
          if (!routeObj) {
            routeArr.push({
              uri: route.path.toLowerCase(),
              method: method,
              route_name: routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [
      {
        route: '/admin/user/create',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/admin/user/create',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/admin/user/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/user/addbulk',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/admin/user/addbulk',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/admin/user/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/user/list',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/admin/user/list',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/admin/user/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/user/:id',
        role: 'SUPER_ADMIN',
        method: 'GET',
      },
      {
        route: '/admin/user/:id',
        role: 'EMPLOYEE',
        method: 'GET',
      },
      {
        route: '/admin/user/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/user/count',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/admin/user/count',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/admin/user/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/user/update/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/admin/user/update/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/admin/user/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/user/updatebulk',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/admin/user/updatebulk',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/admin/user/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/user/delete/:id',
        role: 'SUPER_ADMIN',
        method: 'DELETE',
      },
      {
        route: '/admin/user/delete/:id',
        role: 'EMPLOYEE',
        method: 'DELETE',
      },
      {
        route: '/admin/user/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/user/deletemany',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/admin/user/deletemany',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/admin/user/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/usertokens/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/usertokens/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/usertokens/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/usertokens/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/role/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/role/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/role/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/role/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/role/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/role/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/role/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/role/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/role/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/projectroute/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/projectroute/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/projectroute/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/projectroute/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/routerole/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/routerole/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/routerole/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/routerole/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/userrole/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/userrole/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/userrole/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/admin/userrole/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/create',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/create',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/list',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/list',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'SUPER_ADMIN',
        method: 'GET',
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'EMPLOYEE',
        method: 'GET',
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/user/count',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/count',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'SUPER_ADMIN',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'EMPLOYEE',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'SUPER_ADMIN',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'EMPLOYEE',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'SUPER_ADMIN',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'EMPLOYEE',
        method: 'POST',
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/role/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/role/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/role/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'DEVELOPER',
        method: 'GET',
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'DEVELOPER',
        method: 'POST',
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'DEVELOPER',
        method: 'PUT',
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'DEVELOPER',
        method: 'DELETE',
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'DEVELOPER',
        method: 'POST',
      },
    ];
    if (routeRoles && routeRoles.length) {
      const routes = [
        ...new Set(
          routeRoles.map((routeRole) => routeRole.route.toLowerCase())
        ),
      ];
      const routeMethods = [
        ...new Set(routeRoles.map((routeRole) => routeRole.method)),
      ];
      const roles = ['DEVELOPER', 'SUPER_ADMIN', 'EMPLOYEE', 'TEAM_LEAD', 'HR'];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        isActive: true,
        isDeleted: false,
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { $in: roles.map((role) => role.toUpperCase()) },
        isActive: true,
        isDeleted: false,
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map((routeRole) => {
        projectRouteId = insertedProjectRoute.find(
          (pr) =>
            pr.uri === routeRole.route.toLowerCase() &&
            pr.method === routeRole.method
        );
        roleId = insertedRoles.find(
          (r) => r.code === routeRole.role.toUpperCase()
        );
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id,
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async (routeRole) => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(
          RouteRole,
          routeRolesToBeInserted
        );
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole () {
  try {
    const userRoles = [
      {
        username: 'admin',
        password: 'tRGyeP7QRgtYinN',
      },
      {
        username: 'developer',
        password: 'zcB7oXQrNxQuNIs',
      },
    ];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { $in: userRoles.map((userRole) => userRole.username) }, });
    let user = {};
    const userRolesArr = [];
    userRoles.map((userRole) => {
      user = insertedUsers.find(
        (user) =>
          user.username === userRole.username &&
          user.isPasswordMatch(userRole.password) &&
          user.isActive &&
          !user.isDeleted
      );
      if (user) {
        if (user.userType === authConstant.USER_TYPES.DEVELOPER) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'DEVELOPER')._id,
          });
        } else if (user.userType === authConstant.USER_TYPES.SUPER_ADMIN) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'SUPER_ADMIN')._id,
          });
        } else if (user.userType === authConstant.USER_TYPES.EMPLOYEE) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'EMPLOYEE')._id,
          });
        } else if (user.userType === authConstant.USER_TYPES.HR) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'HR')._id,
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'TEAM_LEAD')._id,
          });
        }
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async (userRole) => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId,
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId,
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes) {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
}
module.exports = seedData;
