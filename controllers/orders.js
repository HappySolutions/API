const {Order, validate} = require('../models/orders');


async function getOrders (req, res) {     
    const orders = await Order.find();
    res.send(orders);
}

async function getOrderByID (req, res) {     
    const order = await Order.findById(req.params.id);

    if(!order) return res.status(404).send('Product with given ID is not found');
    
    res.send(order);
}

async function createOrder (req, res) {     
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    let newOrder = new Order({ 
        Name: req.body.Name,
        Address: req.body.Address,
        City: req.body.City,
        Phone: req.body.Phone,
        Payment: req.body.Payment,
        OrderPrice: req.body.OrderPrice
    });

    newOrder = await newOrder.save();
     
    res.send(newOrder);
}

async function updateOrder (req, res) {     
//validate the Order
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Order
    const UpdatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Address: req.body.Address,
        City: req.body.City,
        Phone: req.body.Phone,
        Payment: req.body.Payment,
        OrderPrice: req.body.OrderPrice      
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdatedOrder);
    
}

async function deleteOrder (req, res) {     
    const DeletedOrder = await Order.findByIdAndRemove(req.params.id);

    if(!DeletedOrder) return res.status(404).send('genre is not found');

    res.send(DeletedOrder);
    
}

exports.getOrders = getOrders;
exports.getOrderByID = getOrderByID;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
