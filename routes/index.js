var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");

//ROOT ROUTE
router.get("/",function(req,res){
    res.render("landing"); 
});
 
//SHOW REGISTER FORM
router.get("/register",function(req,res){
    res.render("register");
});

//REGISTER LOGIC ROUTE
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
         req.flash("error",err.message);
         return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
       res.redirect("/campground");
       });
    });
});
 
//SHOW LOGIN FORM
router.get("/login",function(req,res){
    res.render("login");
});
 
//LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local",
    {
       successRedirect:"/campground",
       failureRedirect:"/login"
    }),function(req,res){
});
 
//LOGOUT ROUTE
router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Successfully Logout");
    res.redirect("/login");
})

module.exports=router;