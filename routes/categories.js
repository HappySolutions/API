const express = require('express');
const router = express.Router();
const {Category, validate} = require('../models/categories');
const mongoose = require('mongoose');



router.get('/',async (req, res) =>{
    const categories = await Category.find();
    res.send(categories);
});

//============================
router.get('/:id',async (req, res) =>{
    const category = await Category.findById(req.params.id);

    if(!category) return res.status(404).send('Product with given ID is not found');
    
    res.send(category);
});

//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    const newCategory = new Category({ 
        CategoryName: req.body.CategoryName,
        });

    await newCategory.save();
     
    res.send(newCategory);
});
//===========================================

router.put('/:id', async (req, res) => {
//validate the Order
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Order
    const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id, {
        CategoryName: req.body.CategoryName
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdatedCategory);
    
});
//===============================================

router.delete('/:id', async (req, res) => {
    //find the Product
    const DeletedCategory = await Category.findByIdAndRemove(req.params.id);

    if(!DeletedCategory) return res.status(404).send('genre is not found');

    res.send(DeletedCategory);

});

module.exports = router;