const express = require('express');
const router = express.Router();
const {CartOrder, validate} = require('../models/cartOrders');
const mongoose = require('mongoose');



router.get('/',async (req, res) =>{
    const cartOrders = await CartOrder.find();
    res.send(cartOrders);
});

//============================
router.get('/:id',async (req, res) =>{
    const cartOrders = await CartOrder.findById(req.params.id);

    if(!cartOrders) return res.status(404).send('Product with given ID is not found');
    
    res.send(cartOrders);
});

//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    let newCartOrder = new CartOrder({ 
        Name: req.body.Name,
        Address: req.body.Address,
        City: req.body.City,
        Phone: req.body.Phone,
        Payment: req.body.Payment,
        OrderPrice: req.body.OrderPrice
    });

    newCartOrder = await newCartOrder.save();
     
    res.send(newCartOrder);
});
//===========================================

router.put('/:id', async (req, res) => {
//validate the Order
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Order
    const UpdateCartdOrder = await CartOrder.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Address: req.body.Address,
        City: req.body.City,
        Phone: req.body.Phone,
        Payment: req.body.Payment,
        OrderPrice: req.body.OrderPrice      
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdateCartdOrder);
    
});
//===============================================

router.delete('/:id', async (req, res) => {
    //find the Product
    const DeletedCartOrder = await CartOrder.findByIdAndRemove(req.params.id);

    if(!DeletedCartOrder) return res.status(404).send('genre is not found');

    res.send(DeletedCartOrder);

});

module.exports = router;