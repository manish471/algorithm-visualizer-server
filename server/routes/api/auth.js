if (process.env.NODE_ENV !== 'production') { 
      require('dotenv').config(); 
} 
const router = require("express").Router();
const passport = require("passport");
const User = require('../../models/User');
const Code = require('../../models/Code');


router.get('/',(req,res,next)=>{
    res.status(200).send({user:req.user});
})

router.get('/logout',(req,res,next)=>{
    
    req.logout();
    // res.redirect(process.env.FRONTEND_WEB_URL);
    res.status(200).send({success:true,message:'logout successful!'});
})

// auth with google
router.get('/google',passport.authenticate('google'));

router.get('/google/callback',passport.authenticate('google'),(req,res,next)=>{
    try{
        if(!req.user) throw(new Error("Unable to Authenticate with Google Server"))
        res.redirect(process.env.FRONTEND_WEB_URL+"visualizer");
    }catch(e){
        next(e)
    }
})

// auth with github
router.get('/github',passport.authenticate('github'));

router.get('/github/callback',passport.authenticate('github'),(req,res,next)=>{
    try{
        if(!req.user) throw(new Error("Unable to Authenticate with Github Server"))
        res.redirect(process.env.FRONTEND_WEB_URL);
    }catch(e){
        next(e)
    }
})

module.exports = router;
