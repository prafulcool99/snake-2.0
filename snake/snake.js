
// SNAKE 2.0
// BY SHUBHAM
//29-3-2020

function initial(){
	canvas=document.getElementById("mycanvas")
	W=canvas.width=1000
	H=canvas.height=1000
	pen=canvas.getContext('2d')
	trophy=new Image();
	trophy.src="Assets/trophy.png"
	food_img=new Image();
	food_img.src="Assets/apple.png"
	score=4
	gameover=false
	cs=67
	speed=1
	//gameover=false
	snake={
		initial_len:4,
		color:"blue",
		cells:[],
		direction:"right",
		createsnake:function(){
			for(var i=this.initial_len;i>0;i--){
				this.cells.push({x:i,y:0})
			}
		},
		drawsnake:function(){
			pen.fillStyle=snake.color
			for(var i=0;i<this.cells.length;i++)
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2)
		},
		updatesnake:function(){
			var headx=this.cells[0].x
			var heady=this.cells[0].y
			var nextx,nexty
			if(this.direction=="right"){
				nextx=headx+speed
				nexty=heady
			}
			else if(this.direction=="left"){
				nextx=headx-speed
				nexty=heady
			}
			else if(this.direction=="down"){
				nextx=headx
				nexty=heady+speed
			}
			else{
				nextx=headx
				nexty=heady-speed
			}
			for(let i=0;i<snake.cells.length;i++){
				if(snake.cells[i].x==nextx && snake.cells[i].y==nexty){
					gameover=true
					break;
				}
			}

			if(nextx==food.x && nexty==food.y){
				food=getfood()	
				score++;
			}
			else{
			this.cells.pop()
			}
			this.cells.unshift({x:nextx,y:nexty})
		}
	}
	snake.createsnake()
	food=getfood()
	function keyPressed(e){
		if(e.key=="ArrowRight" && snake.direction!="left")
			snake.direction="right"
		else if(e.key=="ArrowLeft" && snake.direction!="right")
			snake.direction="left"
		else if(e.key=="ArrowDown" && snake.direction!="up")
			snake.direction="down"
		else if(e.key=="ArrowUp" && snake.direction!="down")
			snake.direction="up"
	}
	document.addEventListener('keydown',keyPressed)
	
}
function draw(){
	pen.clearRect(0,0,W,H)
	snake.drawsnake()
	pen.fillStyle=food.color
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)
	pen.drawImage(trophy,18,20,cs,cs)
	pen.fillStyle="blue"
	pen.font="20px Roboto"
	pen.fillText(score,45,50)
}

function update(){
	snake.updatesnake()
	if(snake.cells[0].x*cs>1000){
		gameover=true
	}else if(snake.cells[0].y*cs>1000){
		gameover=true
	}else if(snake.cells[0].x<0){
		gameover=true
	}else if(snake.cells[0].y<0){
		gameover=true
	}
}
function getfood(){
	start_position: while (true) {
   	var foodx=Math.round(Math.random()*(W-cs)/cs)
	var foody=Math.round(Math.random()*(H-cs)/cs)
   	let status=0
   	for(let i=0;i<snake.cells.length;i++){
   		if(foodx==snake.cells[i].x && foody==snake.cells[i].y ){
   			status=1
   		}
   	}
    if (status==1) continue start_position;
    break;
	}
	var food={
		x:foodx,
		y:foody,
		color:"red"
	}
	return food
}
function gameloop(){
	if(gameover==true){
		clearInterval(f)
		var show="Game Over !! \nYour score : "+score.toString();
		alert(show)
		return
	}
	draw()
	update()
}
initial();
f=setInterval(gameloop,200)






