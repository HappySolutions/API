const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
// const helmet = require('helmet');
// const morgan = require('morgan');
const config = require('config');
const express = require('express');
const app = express();
const products = require('./routes/products');
const orders = require('./routes/orders');
const cartOrders = require('./routes/cartOrders');
const customers = require('./routes/customers');
const categories = require('./routes/categories');
const users = require('./routes/users');
// const auth = require('./routes/auth');
// const home = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/Products', products);
app.use('/api/Orders', orders);
app.use('/api/CartOrders', cartOrders);
app.use('/api/Customers', customers);
app.use('/api/Categories', categories);
app.use('/api/Users', users);
// app.use('/api/Auth', auth);
// app.use('/', home);

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal error. JWT is not defined');
    process.exit(1);
}

//Connecting to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Sweets', { useNewUrlParser: true })
.then(() => console.log('Connecting to Database...^-^'))
.catch((err) => console.error('Could not connect to Database'));
mongoose.set('useCreateIndex', true);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));