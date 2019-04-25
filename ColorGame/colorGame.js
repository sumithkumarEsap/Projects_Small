var numOfSquares=6;
var colors=	generateRandomColors(numOfSquares);
var pickedColor=pickColor();
var colorDisplay=document.getElementById("colorDisplay");
colorDisplay.textContent=pickedColor; 
var squares=document.querySelectorAll(".square");
var messageDisplay=document.querySelector("#message");
var h1=document.querySelector("h1");
var reset=document.querySelector("#reset");
var easyBtn=document.querySelector("#easy");
var hardBtn=document.querySelector("#hard");

easyBtn.addEventListener("click",function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numOfSquares=3
	colors=generateRandomColors(numOfSquares);
	pickedColor=pickColor();
	for(var i =0;i<squares.length;i++){
		if(colors[i]){
			squares[i].style.backgroundColor=colors[i];
		}else{

			squares[i].style.display="none"

		}
	}
});

hardBtn.addEventListener("click",function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numOfSquares=6;
 	colors=generateRandomColors(numOfSquares);
	pickedColor=pickColor();
	for(var i =0;i<squares.length;i++){
			squares[i].style.backgroundColor=colors[i];
			squares[i].style.display="block"
	}
});
reset.addEventListener("click",function(){
	//generate new colors;
	colors=generateRandomColors(numOfSquares);
	//pick a new random color from array;
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	messageDisplay.textContent="";
	this.textContent="New Colors"
	//change colors in array;
	for(var i = 0;i<squares.length;i++){
		squares[i].style.backgroundColor=colors[i];
	}
	h1.style.backgroundColor="steelblue"
})

for(var i = 0;i<squares.length;i++){
	//add initial colors to squares
	squares[i].style.backgroundColor=colors[i];
	//add event listners to squares
	squares[i].addEventListener("click",function(){
		//grab color of clicked square
		var clickedColr=this.style.backgroundColor;	
		console.log(clickedColr,pickedColor);
		//compare with picked color
		if(clickedColr === pickedColor){
			messageDisplay.textContent="Correct";
			changeColors(clickedColr);
			h1.style.backgroundColor=clickedColr;
			reset.textContent="Play Again";

		}
		else{
			this.style.backgroundColor="#232323";
			messageDisplay.textContent="Try Again";
		}
	});
}

function changeColors(color){
	for(var i =0;i<squares.length;i++){
		squares[i].style.backgroundColor=color;
	}
	}
function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}


function generateRandomColors(num){
	var arr=[];
	for(var i=0;i<num;i++){
		//get random color and push into array
		arr.push(randomColor()); 	
	}
	return arr;
}

function randomColor(){
	//pick red from 0-255
	//pick green from 0-255
	//pick blue from 0-222
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);

	return "rgb("+r+", "+g+", "+b+")";

}