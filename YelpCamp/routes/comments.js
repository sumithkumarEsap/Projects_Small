
var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment =require("../models/comments");

//comments new page
router.get("/new",isLoggedIn,function(req, res) {
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log("error");
        }
        else{
            console.log(campground)
            res.render("comments/new",{campground:campground});
        }
    });
});
//comments create and save
router.post("/",isLoggedIn,function(req,res){
    //lookup campground by id
    Campground.findById(req.params.id,function(err, campground) {
       if(err){
           console.log("err");
           res.redirect("/campgrounds");
       } 
       else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log("error");
               }
               else{
                   //add username and id to comment
                  comment.author.id=req.user._id;
                  comment.author.username=req.user.username;
                  
                   //save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   res.redirect('/campgrounds/'+campground._id );
               }
           })
           
       }
    });
    //create a new comment
    //connect new comment to campground
    //redirect to campground show page
});

//EDIT COMMENTS
router.get("/:comment_id/edit",function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    })
});

//COMMENT UPDATE
router.put("/:comment_id",function(req,res){
    Comment.findByIdByUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect("back")
        }
        else{
            
            res.redirect("/campground/"+ req.params.id);
        }
    });
});
//middlewear

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}

module.exports=router;
