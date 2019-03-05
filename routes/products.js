const express = require('express');
const router = express.Router();

const authen = require('../middleware/authen');

const { getProd, getProdByID, createProd, updateProd,  deleteProd} = require ('../controllers/products')


router.get('/', getProd);

//============================
router.get('/:id', getProdByID);

//============================
router.post('/',authen , createProd);
//===========================================

router.put('/:id',authen , updateProd);
    
//===============================================

router.delete('/:id',authen , deleteProd ) 
    
module.exports = router;