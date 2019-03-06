const {Product, validate} = require('../models/products');
const {Category} = require('../models/categories')

async function getProd (req, res) {     
        const products = await Product.find();
        res.send(products);
}

async function getProdByID (req, res) {     
    const product = await Product.findById(req.params.id);

    if(!product) return res.status(404).send('Product with given ID is not found');
    
    res.send(product);
}
///////////////////////////////
async function getProdByCat (req, res) { 
    var query = { Pro_Name: req.params.Pro_Name };    
    const product = await Product.find(query);

    if(!product) return res.status(404).send('Product with given ID is not found');
    
    res.send(product);
}
//////////////////////////////////////////
async function createProd (req, res) {     
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const category = await Category.findById(req.body.CategoryId);
    if(!category) return res.status(404).send('Invalide Category');

    //create the new Product
    const newProduct = new Product({ 
        Pro_Name: req.body.Pro_Name,
        Category: {
            _id: category.id,
            CategoryName: category.CategoryName
        },
        numberInStock: req.body.numberInStock,
        Pro_Description: req.body.Pro_Description,
        Pro_Price: req.body.Pro_Price,
        Pro_IMG: req.body.Pro_IMG
    });

    await newProduct.save();
     
    res.send(newProduct);
}

async function updateProd (req, res) {     
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
}

async function deleteProd (req, res) {     
    //find the Product
    const DeletedProduct = await Product.findByIdAndRemove(req.params.id);

    if(!DeletedProduct) return res.status(404).send('genre is not found');

    res.send(DeletedProduct);
}

exports.getProd = getProd;
exports.getProdByID = getProdByID;
exports.createProd = createProd;
exports.updateProd = updateProd;
exports.deleteProd = deleteProd;
exports.getProdByCat = getProdByCat;
