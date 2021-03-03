Engine = Matter.Engine
const World = Matter.World;
const Bodies =  Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

var invisubleGround;
var basket;
var candy;
var candiesGroup;
var virus;
var virusGroup;

var bg1Img, bg2Img;
var candy1I, candy2I, candy3I, candy4I, candy5I;
var virus1I, virus2I, virus3I;
var basketImg;
var drop1, drop2, drop3, drop4, drop5, dropImg;

var gameState;
var score = 0;
var num = 0;

function preload(){
  bg1Img = loadImage("bg1.jpg");
  bg2Img = loadImage("bg2.jpg");

  candy1I = loadImage("candy1I.png");
  candy2I = loadImage("candy2I.png");
  candy3I = loadImage("candy3I.png");
  candy4I = loadImage("candy4I.png");
  candy5I = loadImage("candy5I.png");

  basketImg = loadImage("basket.png");
  dropimg = loadImage("drop.png");

  virus1I = loadImage("virus1I.png");
  virus2I = loadImage("virus2I.png");
  virus3I = loadImage("virus3I.png");

  dropImg = loadImage("drop.png");
}

function setup(){
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  candiesGroup = new Group();
  virusGroup = new Group();
  
  invisubleGround = createSprite(600, 500, 600, 10);
  invisubleGround.visible = false;

  drop1 = createSprite(600, 520, 10, 10);
  drop1.addImage(dropImg);
  drop1.scale = 0.1;
  drop1.visible = false;

  drop2 = createSprite(612,520,10,10);
  drop2.addImage(dropImg);
  drop2.scale = 0.1;
  drop2.visible = false;

  drop3 = createSprite(622, 520, 10, 10);
  drop3.addImage(dropImg);
  drop3.scale = 0.1;
  drop3.visible = false;

  drop4 = createSprite(632,520, 10,10);
  drop4.addImage(dropImg);
  drop4.scale = 0.1;
  drop4.visible = false;

  drop5 = createSprite(642, 520, 10, 10);
  drop5.addImage(dropImg);
  drop5.scale = 0.1;
  drop5.visible = false;

  gameState = "Start";

  basket = createSprite(600, 400, 5, 20);
  basket.addImage(basketImg);
  basket.scale = 0.3;
  basket.visible = false;
}

function draw(){

  if(gameState==="Start"){
    background(bg1Img);

    textSize(15);
    fill("punch");
    text("Wellcome to CandyLand", 600, 100);
    text("Here you have to collect all the candies, you can't miss anyone", 400, 140);
    text("and if you, then you will loose the game.", 400, 160);
    text("In CandyLand their are viruses too, stay away fom them.", 400, 190);
    text("Don't collect any of the candies with viruses.", 400, 220);
    text("And you if collect it then you can loose but don't worry we have", 400, 250);
    text("some drops of sanitizer which can only save you 1 time.", 400, 270);
    text("you can use arrow keys to move the basket.", 400, 300);
    text("Press SPACE KEY to continue", 600, 330);

    if(keyWentDown("space")){
      gameState = "play";
    }
  }

  if(gameState==="play"){
    background(bg2Img);
    candies();
    viruses();
    basket.visible = true;

    drop1.visible = true;
    drop2.visible = true;
    drop3.visible = true;
    drop4.visible = true;
    drop5.visible = true;

    if(keyWentDown("RIGHT_ARROW")){
      basket.velocityX = 8;
    }
    if(keyWentDown("LEFT_ARROW")){
      basket.velocityX = -8;
    }
    candies();
    viruses();

    fill("pink");
    text("score: "+score, 600, 540);

    if(candiesGroup.isTouching(basket)){
      candiesGroup.destroyEach();
      score = score + 1
    }
    if(candiesGroup.isTouching(invisubleGround)){
      candiesGroup.destroyEach();
      gameState = "over";
    }
    if(virusGroup.isTouching(basket)){
      virusGroup.destroyEach();
      num = num +1
    }
    if(num === 1){
      drop1.destroy();
    }
    if(num === 2){
      drop2.destroy();
    }
    if(num === 3){
      drop3.destroy();
    }
    if(num === 4){
      drop4.destroy();
    }
    if(num === 5){
      drop5.destroy();
    }
    if(num === 6){
      gameState = "over"
    }
    if(virusGroup.isTouching(invisubleGround)){
      virusGroup.destroyEach();
    }
    textSize(2);
    text("num "+ num, 32, 86, 39);
  }
  if(gameState==="over"){
    background("red");
    fill("black");
    textSize(50)
    text("You lose the game", 300, 300);
    basket.detroy();
    candies.destroyEach();
    virus.destroyEach();
  }

  drawSprites();

}
function candies(){

  if(frameCount % 60 === 0){
    var candy = createSprite(0,0,10,10);
    candy.x = random(10,1100);
    candy.y = random(10,100);
    candy.velocityY = 4;
    candy.scale = 0.2;

    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: candy.addImage(candy1I);
              break;
      case 2: candy.addImage(candy2I);
              break;
      case 3: candy.addImage(candy3I);
              break;
      case 4: candy.addImage(candy4I);
              break;
      case 5: candy.addImage(candy5I);
              break;
      default:break;
    }
    candiesGroup.add(candy);
  }
}
function viruses(){
  if(frameCount % 90 === 0) {
    var virus = createSprite(0,0,10,10);
    virus.x = random(10,1200);
    virus.y = random(10,100);
    virus.velocityY = 4;
    virus.scale = 0.2;

    var rand = Math.round(random(1,3));
    switch(rand)  {
      case 1: virus.addImage(virus1I);
              break;
      case 2: virus.addImage(virus2I);
              break; 
      case 3: virus.addImage(virus3I);
              break;
      default: break;
    }
    virusGroup.add(virus);
  }
}
