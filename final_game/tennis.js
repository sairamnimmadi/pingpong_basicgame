	var canvas;
	var tot=0;
	var canvasContext;
	var ballx=(Math.random()*500)+50;
	var ballY=(Math.random()*300)+100;
	var ballspeedX=10;
	var ballspeedY=5;
	var ypos=210;
	var ypos1=210;
	var paddle_thickness=10;
	var paddle_height=100;
	let left = new Audio();
	let right = new Audio();
	left.src = "left.mp3";
	right.src = "right.mp3";
	var colorArray = [
		'#ff0f09',
		'#00fff6',
		'#ffea00',
		'#f609ff',
		'#ff4e00',
	   '#148F77',
	   '#FF00FF',
	   '#808000'
	];
	window.onload=function(){
		canvas=document.getElementById('gamecanvas');
		canvasContext = canvas.getContext('2d');
		var frameperSecond=45;
		setInterval(function(){
			move();
			draw();
			leftpaddle();
			automove();
		},1000/frameperSecond);
}
function leftpaddle(){
	canvasContext.fillStyle='yellow';
	canvasContext.fillRect(0,ypos,paddle_thickness,paddle_height);
}
function ballreset(){
	ballx = 100;
	bally = 160;
}
function automove(){
	canvasContext.fillStyle='blue';
	canvasContext.fillRect(canvas.width-10,ypos1,paddle_thickness,paddle_height)
	if((ypos1+(paddle_height/2))<ballY-30 && ypos1<canvas.height-paddle_height){
		ypos1+=6;
	}
	else if((ypos1+(paddle_height/2))>ballY+30 && ypos1>0){
		ypos1-=6;
	}
}
function move() {
	ballx=ballx+ballspeedX;
	ballY=ballY+ballspeedY;
	if(ballx>canvas.width-5){
		if((ballY)>(ypos1-15)&&ballY<ypos1+paddle_height+10){
			changepaddlecolor();
			ballspeedX=-ballspeedX;
			ballspeedY=(ballY-(ypos1+(paddle_height/3)))*0.12;
			
		}
		else{
			tot+=1;
			document.getElementById('score').innerHTML="SCORE :"+tot;
			ballreset();	
		}
	}
	if(ballY<5){
		ballspeedY=-ballspeedY;
	}
	if(ballY>canvas.height-5){
		ballspeedY=-ballspeedY;
	}
	if(ballx<5){
		if((ballY)>(ypos-15)&&ballY<ypos+paddle_height+15){
			changepaddlecolor();
			ballspeedX=-ballspeedX
			ballspeedY=(ballY-(ypos+(paddle_height/2)))*0.12;
		}
		else{
		ballreset();
		tot=0;
		document.getElementById('score').innerHTML="SCORE :"+tot;
		window.alert("GAME OVER");
		window.location.href= "ping.html";
		}
	}
}
function changepaddlecolor(){
	canvasContext.fillStyle='red';
	canvasContext.fillRect(0,ypos,paddle_thickness,paddle_height);
}
function draw(){
	console.log(ballx);
	console.log(ballY);
	canvasContext.fillStyle='black ';
	canvasContext.fillRect(0,0,canvas.width,canvas.height)
	canvasContext.fillStyle=colorArray[Math.floor(Math.random() * colorArray.length)];
	canvasContext.beginPath();
	canvasContext.arc(ballx,ballY,6,0,2*Math.PI,true);
	canvasContext.fill();
}
function updown(e){
	if(e.keyCode==38&&ypos>10){
		left.play();
		ypos-=20;
	}
	if(e.keyCode==40&&ypos<canvas.height-(paddle_height+10)){
		right.play();
		ypos+=20;
	}	
}
document.onkeydown=updown;
function ballreset(){
	ballx=(Math.random()*500)+50;
	ballY=(Math.random()*300)+100;
}