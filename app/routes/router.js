const express = require('express');
const router = express.Router();

//Chaining
// /api/people
router.use('/people',require('./api/employeeRoutes'));

module.exports = router;