const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const { getCartOrders, getCartOrderByID, createCartOrder, updateCartOrder,  deleteCartdOrder } = require ('../controllers/cartOrders')

const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('/', getCartOrders);

//============================
router.get('/:id', getCartOrderByID);

//============================
router.post('/', createCartOrder);
//===========================================

router.put('/:id', updateCartOrder);
//===============================================

router.delete('/:id', deleteCartdOrder);

module.exports = router;