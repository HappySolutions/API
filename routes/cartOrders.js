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
        Pro_Name: req.body.Pro_Name,
        Pro_Category: req.body.Pro_Category,
        Pro_Description: req.body.Pro_Description,
        Pro_Price: req.body.Pro_Price,
        SelectedQuantity: req.body.SelectedQuantity,
        SumPrice: req.body.SumPrice,
        Pro_IMG: req.body.Pro_IMG
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
        Pro_Name: req.body.Pro_Name,
        Pro_Category: req.body.Pro_Category,
        Pro_Description: req.body.Pro_Description,
        Pro_Price: req.body.Pro_Price,
        SelectedQuantity: req.body.SelectedQuantity,
        SumPrice: req.body.SumPrice,
        Pro_IMG: req.body.Pro_IMG
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