const express = require('express');
const router = express.Router();
const authen = require('../middleware/authen');
const admin = require('../middleware/admin');

const { getCategories, getCategoryByID, createCategory, updateCategory,  deleteCategory } = require ('../controllers/categories')


router.get('/', getCategories);

//============================
router.get('/:id', getCategoryByID);

//============================
router.post('/',authen , createCategory);
//===========================================

router.put('/:id',authen , updateCategory);
//===============================================

router.delete('/:id',[authen, admin] , deleteCategory);

module.exports = router;