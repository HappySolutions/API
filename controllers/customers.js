const {Customer, validate} = require('../models/customers');
const _ = require('lodash');
const bcrypt = require('bcrypt');


async function getCustomers (req, res) {     
    const customers = await Customer.find();
    res.send(customers);
}

async function getCustomerByID (req, res) {     
    const customers = await Customer.findById(req.params.id);

    if(!customers) return res.status(404).send('Product with given ID is not found');
    
    res.send(customers);
}

async function createCustomer (req, res) {     
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let customer = await Customer.findOne({ Email: req.body.Email});
    if (customer) return res.status(404).send('Customer already registered Please SignIn');

    //create the new Customer
    newCustomer = new Customer(_.pick(req.body, ['UserName', 'Email', 'Password', 'Phone', 'Address']));

    const salt = await bcrypt.genSalt(10);
    newCustomer.Password = await bcrypt.hash(req.body.Password, salt);

    await newCustomer.save();


    res.send(_.pick(newCustomer, ['_id', 'Name', 'Email', 'Phone', 'Address']));
    // let newCustomer = new Customer({ 
    //     UserName: req.body.UserName,
    //     Password: req.body.Password,
    //     Email: req.body.Email,
    //     Phone: req.body.Phone,
    //     Address: req.body.Address,
    // });

    // newCustomer = await newCustomer.save();
     
    // res.send(newCustomer);
}

async function updateCustomer (req, res) {     
//validate the Customer
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Customer
    const UpdateCustomer = await Customer.findByIdAndUpdate(req.params.id, {
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
        }, {
        new: true
      });

    //return the updated Customer
    res.send(UpdateCustomer);
}

async function deleteCustomer (req, res) {     
        //find the Customer
        const DeletedCustomer = await Customer.findByIdAndRemove(req.params.id);

        if(!DeletedCustomer) return res.status(404).send('genre is not found');
    
        res.send(DeletedCustomer);
    
}

exports.getCustomers = getCustomers;
exports.getCustomerByID = getCustomerByID;
exports.createCustomer = createCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
exports.logCustomer = logCustomer;