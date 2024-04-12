var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var gameTime = 0;

var player = { x: 160, y: 330, height:80, width: 105, xSpeed:0, ySpeed:0 };


function Block(x, y, width, height, xSpeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}

function drawBlock(block){
    // context.fillStyle = "black";
    // context.fillRect(block.x, block.y, block.width, block.height)
    
    pic = new Image();
    pic.src = "brick_wall.png";
    context.drawImage(pic, block.x, block.y,  block.width, block.height,);
}

var enemy = new Block(canvas.width, canvas.height-150, 50, 100, -2)

function Platform(x,y,width,height,xSpeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}

function drawPlatform(block){
    pic = new Image();
    pic.src = "20.png";
    context.drawImage(pic, block.x, block.y, block.width, block.height);
}

var platform1 = new Platform(0, canvas.height-50, canvas.width, 50, -3)
var platform2 = new Platform(canvas.width, canvas.height-50, canvas.width, 50, -3)



function draw(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    

    drawBlock(enemy);

    pic = new Image();
    pic.src = "el primo.png";
    context.drawImage(pic, player.x, player.y, player.height, player.width);

    // pic = new Image();
    // pic.src = "grass.png";
    // context.drawImage(pic, -20, canvas.height - 50, 700 , 50);
    // context.fillStyle = "orange";
    // context.fillRect(0, canvas.height - 50, canvas.width, 50);

    drawPlatform(platform1);
    drawPlatform(platform2);


    context.font = "20px Arial";
    context.fillStyle = 'white';
    context.fillText("Пройдено:" + gameTime, 10, 30);
    
}

function updateGame(){

    player.x += player.xSpeed;
    player.y += player.ySpeed;

    if (player.y >= canvas.height - player.height - 70){
        player.ySpeed = 0;
        player.xSpeed = 0; 
    }

    enemy.x += enemy.xSpeed;

    if (enemy.x < 0-enemy.width){
        enemy.x = canvas.width;

        enemy.width = Math.floor(Math.random() * 100 ) + 50;
        enemy.height = Math.floor(Math.random() * 200 ) + 50;
        enemy.y = canvas.height - 50 - enemy.height;
        enemy.xSpeed = (Math.floor(Math.random() * 5) + 3 )* -1;

    }

    platform1.x += platform1.xSpeed;
    platform2.x += platform2.xSpeed;

    if (platform1.x < 0-platform1.width){
        platform1.x = platform2.width -10
    }

    if (platform2.x < 0-platform2.width){
        platform2.x = platform1.width -10
    }

    gameTime ++;
    

}

function checkCollision(){
    if (player.x + player.width > (enemy.x + 35)  && 
        player.x < (enemy.x + enemy.width -10) && 
        player.y + player.height > (enemy.y -22) && 
        player.y < enemy.y + enemy.height){
        
        modal.style.display = "block";
        document.getElementById("message").innerHTML = "Проигрыш <br/> Пройдено "+gameTime + " пути";
        game.stop();



    }

}

var modal = document.getElementById("myModal");


window.onclick - function(event){
    if (event.target == modal){
        modal.style.display = "none";
        location.reload();
    }
}


function onKeyPress(event){
    const key = event.key.toLowerCase();
    if (key === "a"){
        player.xSpeed = -5;    
    }
    if (key === "d"){
        player.xSpeed = 5;
    }

    if (key ===" "){
        player.ySpeed = -9;
    }
}

window.addEventListener("keydown", onKeyPress);

function onKeyRealease(event){
    const key = event.key.toLowerCase();
    if (key === "a" || key ==="d"){
        player.xSpeed = 0;
    }
    if (key === " "){
        player.ySpeed = 4;
    }
}
window.addEventListener("keyup", onKeyRealease);

function tick(){

    checkCollision();

    updateGame();

    draw();


    game = window.setTimeout("tick()", 1000/60);
}

tick();