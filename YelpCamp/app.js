var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose =require("mongoose");
var passport = require("passport");
var localStrategt = require("passport-local");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var User =require("./models/user");
var Comment=require("./models/comments");
var methodOverride =require("method-override");
var commentRoutes   =require("./routes/comments"),
    campgroundRoute =require("./routes/campground"),
    authRoutes      =require("./routes/auth");
    
//seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret :"my name is sumith",
    resave : false,
    saveUninitialized:false 
}));

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategt(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

//requiring routes
app.use("/campgrounds/:id/comments/",commentRoutes);
app.use("/campgrounds",campgroundRoute);
app.use("/",authRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp has started");
});