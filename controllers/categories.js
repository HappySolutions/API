const {Category, validate} = require('../models/categories');


async function getCategories (req, res) {     
    const categories = await Category.find();
    res.send(categories);
}

async function getCategoryByID (req, res) {     
    const category = await Category.findById(req.params.id);

    if(!category) return res.status(404).send('Product with given ID is not found');
    
    res.send(category);
}


async function createCategory (req, res) {     
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    const newCategory = new Category({ 
        CategoryName: req.body.CategoryName,
        });

    await newCategory.save();
     
    res.send(newCategory);
}

async function updateCategory (req, res) {     
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
}

async function deleteCategory (req, res) {     
    const DeletedCategory = await Category.findByIdAndRemove(req.params.id);

    if(!DeletedCategory) return res.status(404).send('genre is not found');

    res.send(DeletedCategory);
}

exports.getCategories = getCategories;
exports.getCategoryByID = getCategoryByID;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
 