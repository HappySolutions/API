const express = require('express');
const router = express.Router();
const {Order, validate} = require('../models/orders');
const mongoose = require('mongoose');
const { getOrders, getOrderByID, createOrder, updateOrder,  deleteOrder } = require ('../controllers/orders')



router.get('/', getOrders);

//============================
router.get('/:id', getOrderByID);

//============================
router.post('/', createOrder);
//===========================================

router.put('/:id', updateOrder);
//===============================================

router.delete('/:id', deleteOrder);

module.exports = router;