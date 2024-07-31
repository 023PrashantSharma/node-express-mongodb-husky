/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  USER_SECRET:'myjwtadminsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  SUPER_ADMIN:1,
  EMPLOYEE:2,
  TEAM_LEAD:3,
  HR:4,
};

const PLATFORM = {
  WEB:1,
  MOBILE:2 
};

let LOGIN_ACCESS = {       
  [USER_TYPES.SUPER_ADMIN]:[PLATFORM.WEB],
  [USER_TYPES.EMPLOYEE]:[PLATFORM.WEB],        
  [USER_TYPES.TEAM_LEAD]:[PLATFORM.WEB],        
  [USER_TYPES.HR]:[PLATFORM.WEB],        
};

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: true
  },
  EXPIRE_TIME: 20
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};