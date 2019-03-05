const express = require('express');
const router = express.Router();
const {Product, validate} = require('../models/products');
const {Category} = require('../models/categories')
const mongoose = require('mongoose');
const authen = require('../middleware/authen');

async function getProd (req, res) {     
        const products = await Product.find();
        res.send(products);
}

exports.getProd = getProd;