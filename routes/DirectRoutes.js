const express = require('express');
const Router = express.Router();

//get the direct routes
const DirectRoute = require('../controllers/DirectController');

//page authorization
const PageAuth = require('../middleware/DataAuthorization');

//Home route
Router.get('/home', PageAuth.authorizedForpage, DirectRoute.goToHome);
Router.get('/', PageAuth.authorizedForpage, DirectRoute.goToHome);

//get login page route
Router.get('/login', DirectRoute.gotToLogin);

// user logout
Router.get('/logout', PageAuth.deleteCookie, DirectRoute.gotToLogin)

//Register route
Router.get('/register', PageAuth.authorizedForpage, DirectRoute.gotToRegister);

//Gadget route
Router.get('/gadgets', PageAuth.authorizedForpage, DirectRoute.gotToGadget);

//grocery route
Router.get('/groceries', PageAuth.authorizedForpage, DirectRoute.gotToGroceries);

//clothes route
Router.get('/clothes', PageAuth.authorizedForpage, DirectRoute.gotToClothes);

//add product route
Router.get('/add-product',PageAuth.authorizedForpage, DirectRoute.goToAddNewProduct);


//export routes
module.exports = Router;