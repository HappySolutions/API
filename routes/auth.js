const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {User} = require('../models/users');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { createAuth } = require ('../controllers/auth')


//============================

router.post('/', createAuth);

//===========================================



module.exports = router;