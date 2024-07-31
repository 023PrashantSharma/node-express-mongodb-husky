/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/team-lead/auth',require('./auth'));

module.exports = router;
