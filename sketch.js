var coinsound,treasureGroup;
var END;
var backGround,backgroundImage
var player,playerAnimation;
var obstacle,obstacleImage,obstacleGroup;
var food,foodImage,foodGroup;
var score=0;
var ground;
var gameState="END"
var gameState="PLAY"
var death=0;
var gameOver,gameOverImage;
var restart,restartImage;
var jumpSound;
var sticker,stickerImage;
var endSound;
var invisibleground;
var treasure,treasureImage;
var sticker1,sticker1Image;
var gameSound;
var heart,heartImage;
var Lifeline;
var database; 
function preload(){
backgroundImage=loadImage("background.png")
  playerAnimation=loadAnimation("tom.gif");
  obstacleImage=loadImage("lion1-1.gif");
  foodImage=loadImage("coin.gif");
 
gameOverImage=loadImage("game-over-png.png")
  restartImage=loadImage("restart icon.png")
stickerImage=loadImage("sad.gif")
  jumpSound=loadSound("checkPoint.mp3");
    endSound=loadSound("game-over-sound-effect.mp3");
  coinsound=loadSound("coin-drop-4.mp3");
  treasureImage=loadImage("Treasure-Box.png");
  sticker1Image=loadImage("sticker.png");
  
  heartImage=loadImage("heart-1.png");
}

function setup() {
  createCanvas(600,600)
  database=firebase.database();
 backGround=createSprite(100,100,100,10);
  backGround.addImage("background",backgroundImage);
  backGround.velocityX=+4;

  player=createSprite(90,350,100,20);
  player.addAnimation("playr",playerAnimation);
  player.scale=0.4;
  
 score=0;
  obstacleGroup=new Group();
  foodGroup=new Group();
  ground = createSprite(300, 380, 900, 10);
  ground.shapeColor = "black"
  
  obstacle2Group=new Group();
  
gameOver=createSprite(300,300,50,20);
 gameOver.addImage("gameOver",gameOverImage);
   gameOver.visible=false;
  gameOver.scale=0.2;
  
player.setCollider("circle",0,0,4);
  player.debug = false;
  
  restart=createSprite(300,380,50,20);
restart.addImage("restart",restartImage);
   restart.scale=0.1;
restart.visible=false;
  
  sticker=createSprite(200,300,20,20);
  sticker.addImage("sad",stickerImage);
  sticker.scale=0.1;
 
sticker.visible=false;
   invisibleground = createSprite(300, 380, 900, 10);
  invisibleground.velocityX=-4;
 invisibleground.visible=false;
  
    sticker1=createSprite(250,90,20,20);
  sticker1.addImage("sad",sticker1Image);
  sticker1.scale=0.1;

sticker1.visible=false;
treasureGroup=new Group();
  bomGroup=new Group();
  
    
  
  heart1=createSprite(300,90,20,20);
  heart1.addImage("heart",heartImage);
  heart1.scale=0.05;   
  
    heart2=createSprite(350,90,20,20);
  heart2.addImage("heart",heartImage);
  heart2.scale=0.05;   
  
    heart3=createSprite(400,90,20,20);
  heart3.addImage("heart",heartImage);
  heart3.scale=0.05;   
  
  
}


 
 

function draw() {
//  background("white");
var index=0;
var x=0;
var y;
player.collide(invisibleground)
  ground.visible=false;
     if(mousePressedOver(restart)) {
      reset();
    }
  
   ground.velocityX = -4
  if (gameState === "PLAY") {
  if(backGround.x>400){ 
    backGround.x=300
  }

    
    if (keyDown("Space") && player.y > 314) {
     player.velocityY = -20
     jumpSound.play();
    
    }
    player.velocityY = player.velocityY + 0.8
    
 if(obstacleGroup.isTouching(player)){
    death=death+1;
    
       score=score-1; 
    obstacleGroup.destroyEach();
   heart1.visible=false;
     player.scale=player.scale-0.1;
 }
    
  if(death===2){
      heart2.visible=false;
   
  }
    console.log(death);
   if(death===3){
     gameState="END";
      restart.visible=true;
   gameOver.visible=true;
  sticker.visible=true;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    treasureGroup.setLifetimeEach(-1);
    bomGroup.setLifetimeEach(-1);
      endSound.play();
       heart3.visible=false;
 }
    
    
    if(foodGroup.isTouching(player)){
      score=score+1;
      foodGroup.destroyEach();
      coinsound.play();
      player.scale=player.scale+0.02;
      
    }
    if(score>6){
      sticker1.visible=true;
      obstacleGroup.velocityX=-9;
      backGround.velocityX=+9;
      
       foodGroup.velocityX=-9;
       treasureGroup.velocityX=-9;
       bomGroup.velocityX=-9;
      
      
    }
if(index===0){
  player[index-1]
  camera.position.x=displayWidth/2;
camera.position.y=player[index-1].y
}

  spawnfood();
 drawSprites();
    spawnobstacle();
   
    spawntreasure();
   
    fill("red")
  textSize(20)
 text("Coin collected: " + score, 120, 90);
    fill("blue")
  textSize(20)
 text("3Lifeline: " + Lifeline, 260, 70);
      if(treasureGroup.isTouching(player)){
      score=score+5;
      treasureGroup.destroyEach();
      coinsound.play();
       
        
    }

   
  
  
    if (invisibleground.x < 0) {
     invisibleground.x = invisibleground.x / 2;
    }
 
}
}
   function spawnobstacle(){
     if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,365,10,40);
       obstacle.addImage("obstale",obstacleImage)
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -4
       obstacle.lifetime=130;
       
   }
   }
  function spawnfood(){
    if(frameCount % 200 === 0) {
    var food = createSprite(600,150,10,40);
       food.addImage("food",foodImage)
      food.scale=0.2;
    foodGroup.add(food);
    food.velocityX = -4;
       food.lifetime=140;
      
  }
  }
    
 function spawntreasure(){
    if(frameCount % 400 === 0) {
    var  treasure=createSprite(700,200,50,10);
  treasure.addImage("treas",treasureImage);
  treasure.scale=0.03;
       treasureGroup.add(treasure);
    treasure.velocityX = -4;
       treasure.lifetime=180;
      
  }
  }
  

function playerLife(){
  switch(score){
      
    case 10: player.scale=0.10;
       break;
    case 20: player.scale=0.12;
       break;
    case 30: player.scale=0.14;
       break;
    case 40:player.scale=0.16;
       break; 
    case 50:player.scale=0.18;
       break;
    case 60:player.scale=0.20;  
       break;
    case 70:player.scale=0.22;
       break;
    case 80:player.scale=0.24;
       break;
         }
}

function reset(){
   gameState = "PLAY";
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score = 0;
  gameOver.visible=false;
restart.visible=false;
  sticker.visible=false;
   sticker1.visible=false;
   obstacleGroup.velocityX=-4;
      backGround.velocityX=+4;
      invisibleground.velocityX=-4;
       foodGroup.velocityX=-4;
       treasureGroup.velocityX=-4;
 
  death=0;
  heart1.visible=true;
  heart2.visible=true;
  heart3.visible=true;
  player.scale=0.4;
}
 
