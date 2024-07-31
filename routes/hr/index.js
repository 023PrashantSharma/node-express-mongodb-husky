/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/hr/auth',require('./auth'));

module.exports = router;
