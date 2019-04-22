var mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comments");
    
var data=[
        
        {
            name:"Desert",
            image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
            description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. "
            
        },
        {
            name:"In The Woods",
            image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
            description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet"
            
        },
        {
            name:"River Camping",
            image:"https://farm5.staticflickr.com/4371/36831219845_579e021320.jpg",
            description:"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
            
        }
    ]
    //to remove all elements from db
function seedDB(){
    Campground.remove({},function(err){
    if(err){
        console.log(err)
    }
    console.log("removed");
    data.forEach(function(seed){
    Campground.create(seed,function(err,campground){
        if(err){
            console.log(err)
        }
        else{
            console.log("added camp ground");
            //create a comment 
            Comment.create({
                text:"this place is great,but i wish there was internet",
                author:"sumith"
            },function(err,comment){
                if(err){
                    console.log(err)
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("created a new comment");
                }
            });
        }
    });
});
});
}

module.exports=seedDB;