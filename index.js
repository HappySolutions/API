const mongoose = require('mongoose');
// const debug = require('debug')('app:startup');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const config = require('config');
const express = require('express');
const app = express();
const products = require('./routes/products');
const orders = require('./routes/orders');
const home = require('./routes/home');
// const logger = require('./middleware/logger');
// const authenticator = require('./middleware/authenticator');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/Products', products);
app.use('/api/Orders', orders);
app.use('/', home);
//Connecting to mongoose
mongoose.connect('mongodb://localhost/Sweets')
.then(() => console.log('Connecting to Database...^-^'))
.catch((err) => console.error('Could not connect to Database'));


//Create midleware function
//app.use(logger);
//app.use(authenticator);


//using specific midleware function on specific env
// if(app.get('env') === 'development'){
//     app.use(morgan('tiny'));
//     debug('Morgan is enebled...')
// }

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));