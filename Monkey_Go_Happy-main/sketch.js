var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var banana, banana_img;
var obstacle, obstacle_img;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  banana_img  = loadImage("banana.png");
  obstacle_img = loadImage("stone.png")
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
}

function draw() { 
  background(0);

  fill(255);
  textSize(20);
  text("Score: "+score, 300, 220);


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyWentDown("space") ) {
      player.velocityY = -17.5;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacle();

   

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score +1;
      player.scale += 0.05;
    }

  }

  if(ObstacleGroup.isTouching(player)){
    gameState = END;
  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();

    fill(255);
    textSize(30);
    text("Game Over!", 300, 220);
  }

  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    
    banana = createSprite(850, 200, 20, 50);
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.y=random(200,280);
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth +1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 80 === 0){
    
    obstacle = createSprite(950, 200, 20, 50);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.05;
    obstacle.y=random(120,200);
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    player.depth = obstacle.depth +1;
    ObstacleGroup.add(obstacle);
  }
}
