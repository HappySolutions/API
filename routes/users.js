const express = require('express');
const router = express.Router();
const authen = require('../middleware/authen');


const { createUser, getCurrentUser } = require ('../controllers/users')

//============================
router.get('/me',authen,  getCurrentUser);
router.post('/', createUser);

module.exports = router;