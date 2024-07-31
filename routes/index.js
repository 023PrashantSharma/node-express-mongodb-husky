/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();

router.use(require('./super-admin/index'));
/*
 * router.use(require('./employee/index'));
 * router.use(require('./hr/index'));
 * router.use(require('./team-lead/index')); 
 */

module.exports = router;