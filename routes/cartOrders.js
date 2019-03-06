const express = require('express');
const router = express.Router();
const { getCartOrders, getCartOrderByID, createCartOrder, updateCartOrder,  deleteCartdOrder } = require ('../controllers/cartOrders')


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