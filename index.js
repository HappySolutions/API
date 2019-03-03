import { env, mongo, port, ip, apiRoot } from './config'


const Joi = require('Joi');
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
const auth = require('./routes/auth');
const home = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/Products', products);
app.use('/api/Orders', orders);
app.use('/api/CartOrders', cartOrders);
app.use('/api/Customers', customers);
app.use('/api/Categories', categories);
app.use('/api/Users', users);
app.use('/api/Auth', auth);

app.use('/', home);

// if (!config.get('jwtPrivateKey')) {
//     console.error('Fatal error. JWT is not defined');
//     process.exit(1);
// }

//Connecting to mongoose
mongoose.connect(mongo.uri)
.then(() => console.log('Connecting to Database...^-^'))
.catch((err) => console.error('Could not connect to Database'));

//using specific midleware function on specific env
// if(app.get('env') === 'development'){
//     app.use(morgan('tiny'));
//     debug('Morgan is enebled...')
// }

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));