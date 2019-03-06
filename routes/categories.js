const express = require('express');
const router = express.Router();
const authen = require('../middleware/authen');
const { getCategories, getCategoryByID, createCategory, updateCategory,  deleteCategory } = require ('../controllers/categories')


router.get('/', getCategories);

//============================
router.get('/:id', getCategoryByID);

//============================
router.post('/',authen , createCategory);
//===========================================

router.put('/:id',authen , updateCategory);
//===============================================

router.delete('/:id',authen , deleteCategory);

module.exports = router;