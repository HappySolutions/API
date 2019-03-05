const express = require('express');
const router = express.Router();
const {Product, validate} = require('../models/products');
const {Category} = require('../models/categories')
const mongoose = require('mongoose');
const authen = require('../middleware/authen');

const { getProd, getProdByID, createProd } = require ('../controllers/products')


router.get('/', getProd);

//============================
router.get('/:id', getProdByID);

//============================
router.post('/',authen , createProd);
//===========================================

router.put('/:id',authen , async (req, res) => {
//validate the Product
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Product
    const UpdatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        Pro_Name: req.body.Pro_Name,
        Pro_Category: req.body.Pro_Category,
        numberInStock: req.body.numberInStock,
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

router.delete('/:id',authen , async (req, res) => {
    //find the Product
    const DeletedProduct = await Product.findByIdAndRemove(req.params.id);

    if(!DeletedProduct) return res.status(404).send('genre is not found');

    res.send(DeletedProduct);

});

module.exports = router;