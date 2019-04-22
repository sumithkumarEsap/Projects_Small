var express=require("express");
var router=express.Router();
var Campground=require("../models/campground")

router.get("/",function(req,res){
    //get all campgrounds from db and render
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/Index",{campgrounds:allcampgrounds,currentUser:req.user});
        }
    })
});

router.post("/",isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.img;
    var desc=req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,image:image,description:desc,author:author};
    //create a new campground and save it to db
    Campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{
            //redirects to get request by default
            
            res.redirect("/campgrounds")
        }
    })
    //campgrounds.push(newCampground);
    
});

router.get("/new",isLoggedIn,function(req,res){
    res.render("campground/new");
});
//SHOW MORE INFO ABT CAMPGROUND
router.get("/:id",function(req, res) {
     Campground.findById(req.params.id).populate("comments").exec(function(err,campgroundfound){
         if(err){
             console.log(err)
         }
         else{
            // console.log(campgroundfound);
             res.render("campground/show",{campground:campgroundfound});
         }
         
     });
});
//EDIT AND UPDATE CAMPGROUND ROUTES//
router.get("/:id/edit",checkOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campground/edit",{campground:foundCampground});

    });
});


router.put("/:id",checkOwnership,function(req,res){
    //find and update the campground
    //redirect to show page
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground"+req.params.id);
        }
    });
});

//DESTORY CAMPGROUND ROUTE//

router.delete("/:id",checkOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
})
//middlewear

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}

//MIDDLEWEAR
function checkOwnership(req,res,next){
    if(req.isAuthenticated()){
      
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("back");
        }
        else{
            //if logged in does user own campground?
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back")
            }
        }
    });
    }
    else{
        res.redirect("back");
    }  //if
}
module.exports=router;
