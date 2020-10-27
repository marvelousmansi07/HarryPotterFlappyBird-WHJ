var snitch, snitchImg;
var potter, potterImg;
var potterEnd;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var restartButton, restartImg;
var count = 0;

function preload(){
  pillar1 = loadImage("pictures/pillar1.png");
  pillar2 = loadImage("pictures/pillar2.png");
  pillar3 = loadImage("pictures/pillar3.png");
  pillar4 = loadImage("pictures/pillar4.png");

  potterImg = loadImage("pictures/potter.png");
  potterEnd = loadImage("pictures/potterEnd.png");
  snitchImg = loadImage("pictures/snitch.png");

  restartImg = loadImage("pictures/restartbutton.png");
}

function setup() {
  createCanvas(1200, 800);
  //createSprite
  potter = createSprite(100, 400, 35, 35);
  potter.addImage(potterImg);
  //potter.debug = true;
  potter.setCollider("circle", 0, 0, 100);
  potter.scale = 0.3;

  pillarGroup = new Group();

  restartButton = createSprite(600, 400);
  restartButton.addImage(restartImg);
  restartButton.visible = false;

  snitch = createSprite(1100, 400, 25, 25);
  snitch.addImage(snitchImg);
  snitch.scale = 0.2;
  snitch.velocityX = -5;
}

function draw() {
  background("lightblue");
  spawnPillars(); 
  
  fill("black");
  text("Score: "+ count, 1100, 100); 

  text("GRAB THAT SNITCH!", 600, 100);

  text("Use the up and down arrow keys or the ", 600, 150);
  text("'w' and 's' keys to grab that snitch!", 600, 170);
  edges = createEdgeSprites();

  potter.bounceOff(edges[2]);
  potter.bounceOff(edges[3]);
  snitch.bounceOff(edges[2]);
  snitch.bounceOff(edges[3]);

  if(gamestate === PLAY){
    //score
    count = count + Math.round(World.frameRate/60);
    //move up and down based on up and down arrow key or w and s keys
    if (keyDown("UP_ARROW")){
      potter.velocityX = 0;
      potter.velocityY = -3.5;
    }
    if (keyDown("DOWN_ARROW")){
      potter.velocityX = 0;
      potter.velocityY = 3.5;
    }

    if (keyDown("w")){
      potter.velocityX = 0;
      potter.velocityY = -3.5;
    }
    if (keyDown("s")){
      potter.velocityX = 0;
      potter.velocityY = 3.3;
    }

    if (pillarGroup.isTouching(potter)){
      gamestate = END;
    }
    if (snitch.x = 1150){
      snitch.velocityX = 0;
    }

  } else if(gamestate === END){
      text("You lose!",200,200);
      pillarGroup.setVelocityXEach(0);
      potter.velocityX = 0;
      pillarGroup.destroyEach();
      restartButton.visible = true;
      potter.addImage(potterEnd);
      snitch.visible = false;

  }
  if(mousePressedOver(restartButton)){
    reset();
  }

  drawSprites();
}

function reset(){
  gamestate = PLAY;
  restartButton.visible = false;
  potter.addImage(potterImg);
  potter.x = 100;
  potter.y = 400;
  potter.velocityY = 0;
  count = 0;
  snitch.x = 1100;
  snitch.y = 400;
  snitch.visible = true;
}

function spawnPillars(){
   //write code here to spawn the clouds
   if (World.frameCount % 140 === 0) {
    var pillar = createSprite(1200,700,40,10);
    pillar.y = Math.round(random(0, 800));
    //pillar.debug = true;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: pillar.addImage(pillar1);
              break;
      case 2: pillar.addImage(pillar2);
              break;
      case 3: pillar.addImage(pillar3);
              break;
      case 4: pillar.addImage(pillar4);
              break;
      default: break;
    }
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
     //assign lifetime to the variable
    pillar.lifetime = 400;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
   }
}