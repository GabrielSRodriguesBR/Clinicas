
const passport = require('passport');
const express = require('express');
const routes = express.Router();

const authenticationMiddleware = (req, res, next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/Login');
}


const HomeController = require('./controller/HomeController');
const LoginController = require('./controller/LoginController');
const UserController = require('./controller/UserController');




routes.get('/Login', LoginController.index);
routes.post('/Login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Login?fail=true'
}));
routes.get('/Logout', LoginController.Logout);


routes.get('/', authenticationMiddleware, HomeController.index);

routes.get('/User', authenticationMiddleware, UserController.index);
routes.get('/User/create', authenticationMiddleware, UserController.create);
routes.post('/User/create', authenticationMiddleware, UserController.createPOST);
routes.get('/User/edit/:id', authenticationMiddleware, UserController.edit);
routes.post('/User/edit', authenticationMiddleware, UserController.editPOST);
routes.post('/User/Search', authenticationMiddleware, UserController.Search);


module.exports = routes; 