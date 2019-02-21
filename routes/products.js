const express = require('express');
const router = express.Router();
const {Product, validate} = require('../models/products');
const mongoose = require('mongoose');



router.get('/',async (req, res) =>{
    const products = await Product.find();
    res.send(products);
});

//============================
router.get('/:id',async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if(!product) return res.status(404).send('Product with given ID is not found');
    
    res.send(product);
});

//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    let newProduct = new Product({ 
        Pro_Name: req.body.Pro_Name,
        Pro_Category: req.body.Pro_Category,
        Pro_Description: req.body.Pro_Description,
        Pro_Price: req.body.Pro_Price,
        Pro_IMG: req.body.Pro_IMG

    });

    newProduct = await newProduct.save();
     
    res.send(newProduct);
});
//===========================================

router.put('/:id', async (req, res) => {
//validate the Product
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Product
    const UpdatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        Pro_Name: req.body.Pro_Name,
        Pro_Category: req.body.Pro_Category,
        Pro_Description: req.body.Pro_Description,
        Pro_Price: req.body.Pro_Price,
        Pro_IMG: req.body.Pro_IMG        
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdatedProduct);
    
});
//===============================================

router.delete('/:id', async (req, res) => {
    //find the Product
    const DeletedProduct = await Product.findByIdAndRemove(req.params.id);

    if(!DeletedProduct) return res.status(404).send('genre is not found');

    res.send(DeletedProduct);

});

module.exports = router;