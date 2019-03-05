const express = require('express');
const router = express.Router();
const {Product, validate} = require('../models/products');
const mongoose = require('mongoose');

export const getProd = (req, res, next) =>{
        const products = await Product.find()
        .then (res.send(products))
        .catch(next)
    }
