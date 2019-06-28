var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comments=require("../models/comments");
var middleware=require("../middleware");

//SHOW FORM FOR ADDING NEW COMMENT
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err || !foundCampground)
         {
            req.flash("error","Campground not found");
            res.redirect("back");
         }
      else
          res.render("comment/newComment",{campground:foundCampground});
    });
 });

//ADDING NEW COMMENT
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
       if(err)
       {
          res.redirect("/campground");
       }
       else{
          Comments.create(req.body.comment,function(err,comment){
             if(err)
               console.log(err);
             else
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campground/"+campground._id);
          });
       }
    });
 });

//EDIT COMMENT 
 router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err || !foundCampground)
       {
          req.flash("error","Campground not found");
          return res.redirect("back");
       }
       Comments.findById(req.params.comment_id,function(err,foundComment){
         if(err)
         {
            res.redirect("back");
         }
         else
         {
            res.render("comment/edit",{campground_id:req.params.id,comment:foundComment});
         }
      });
    });
 });

//UPDATE COMMENT
 router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,newComment){
       if(err)
       {
          console.log(err);
          res.redirect("back");
       }
       else
       {
          res.redirect("/campground/"+req.params.id);
       }
    });
 });

 //DELETE COMMENT
 router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comments.findByIdAndRemove(req.params.comment_id,function(err){
       if(err)
         res.redirect("back");
       else
         res.redirect("/campground/"+req.params.id);
    });
 });

 module.exports=router;