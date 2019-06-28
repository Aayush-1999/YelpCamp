var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var methodOverride=require("method-override");
var middleware=require("../middleware");

//SHOW CAMPGROUND
router.get("/",function(req,res){
    Campground.find({},function(err,campground)
    {
       if(err)
          console.log(err);
       else
          res.render("index",{campground:campground});
    });
});
 
//ADD CAMPGROUND
router.post("/",middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author= {
       id:req.user._id,
       username:req.user.username
    };
    var newCampground={name:name,image:image,description:description,author:author};
    Campground.create(newCampground,function(err,campground){
       if(err)
         console.log(err);
       else
         res.redirect("/campground");
    });
});

//SHOW FORM FOR ADDING NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campground/newcampground") ;
});

//SHOW INFO ABOUT A CAMPGROUND
router.get("/:id",function(req, res) {
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground)
        {
           req.flash("error","Campground not found");
           res.redirect("back");
        }
        else
        res.render("campground/show",{campground:foundCampground});   
     });
});

//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findById(req.params.id,function(err,camp){
      if(err)
      {
         console.log(err);
         res.redirect("/campground");
      }
      else{
         res.render("campground/edit",{campground:camp});
      }
   });
});

//UPDATE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,camp){
      if(err)
      {
         console.log(err);
         res.redirect("/campground/"+ req.params.id + "/edit");
      }
      else
      {
         res.redirect("/campground/" + req.params.id);
      }
   });
});

//REMOVE CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err)
         res.redirect("/campground");
      else
      {
         req.flash("success","Campground deleted successfully");
         res.redirect("/campground");
      }
   });
});

module.exports=router;
 