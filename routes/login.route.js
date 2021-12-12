const express=require('express');
const Router = express.Router();
const logInController = require('../userController/adminLogin.controller')
const {authenticateToken} =require('../auth/auth')
Router.get('/', function(req, res){
return "hello world";
})

Router.post('/login', function(req, res){
    logInController.login(req, res);
})

Router.post('/logout',authenticateToken, function(req, res){
    logInController.logout(req, res);
})
Router.get('/auth',authenticateToken, (req, res)=>{
    if(req.user.role == 'admin'){
        res.status(200).json(req.user);
    }else{
        res.status(406).json({msg:"not authorized"});
         
    }

})

module.exports = Router;