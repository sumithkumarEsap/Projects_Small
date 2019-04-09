var express=require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render("search")
})
app.get("/results",function(req,res){
    var query =req.query.search;
    var url= "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url,function(error,response,body){
    if(!error & response.statusCode==200){
        var parsedbody=JSON.parse(body);
        //res.send(parsedbody.Search[0].Title);
        res.render("results",{data:parsedbody});
    }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("movie app has starting!!");
});