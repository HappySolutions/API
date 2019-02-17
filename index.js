const Joi = require('Joi');
const express = require('express');
const app = express();

app.use(express.json());

const Products = [
    {id: 1, Pro_Name: 'Horror'},
    {id: 2, Pro_Name: 'Comedy'},
    {id: 3, Pro_Name: 'Action'},
    {id: 4, Pro_Name: 'Strategy'},
    {id: 5, Pro_Name: 'Drama'}
];

//=======================================
app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/Products', (req, res) =>{
    res.send(Products);
});

//============================
app.get('/api/Products/:id', (req, res) =>{
    const product = Products.find(c => c.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('genre is not found');
    return
    res.send(product);
});

//============================
app.post('/api/Products', (req , res) => {
    //Old  validation way
    /*const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error){
        res.status(404).send(result.error.details[0].message);
        return;
    }*/
    //New Validation way
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    var newProduct = {
        id: Products.length + 1,
        name: req.body.name
    };
    Products.push(newProduct);
    res.send(newProduct);
});
//===========================================

app.put('/api/Products/:id', (req, res) => {
//Find the Product
    const UpdatedProduct = Products.find(c => c.id === parseInt(req.params.id));
    if(!UpdatedProduct) return res.status(404).send('genre is not found');

    //vliadte the data
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //update the Product
    UpdatedProduct.name = req.body.name;
    //return the updated product
    res.send(UpdatedProduct);
    
});
//===============================================

app.delete('/api/Products/:id', (req, res) => {
    //find the Product
    const DeletedProduct = Products.find(c => c.id === parseInt(req.params.id));
    if(!DeletedProduct) return res.status(404).send('genre is not found');
//delete the enre
const index = Products.indexOf(DeletedProduct);
    Products.splice(index, 1);
    res.send(DeletedProduct);

});
//++++++++++++++++++++++++++++++++
//validation function
function validateGenre(product){
    const schema = {
        product: Joi.string().min(3).required()
    };
    return Joi.validate(product, schema);
}
//+++++++++++++++++++++++++++===

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));