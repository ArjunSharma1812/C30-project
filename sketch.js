const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1, wall2;
var bridge;
var jointLink;
var joinPoint;
var stones = [];
var zombie1, zombie2, zombie3, zombie4;
var backgrnd;
var zombie;
var breakButton;
var axe;

function preload(){
     zombie1 = loadImage("./assets/zombie1.png");
     zombie2 = loadImage("./assets/zombie2.png");
     zombie3 = loadImage("./assets/zombie3.png");
     zombie4 = loadImage("./assets/zombie4.png");
     axe = loadImage("./assets/axe.png");
     backgrnd = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 30);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  wall1 = new Base(width-100 ,height-420 ,370, 300);
  wall2 = new Base(100 ,height - 420 ,200, 300);
  joinPoint = new Base(width - 200, height - 540, 50, 50);
  bridge = new Bridge(30,{x: 50 , y: height / 2 - 150 });
  Matter.Composite.add(bridge.body, joinPoint)
  jointLink = new Link(bridge, joinPoint);
  for(var i =0; i <= 8; i++){
    var x = random(width/2 - 200, width / 2 + 300);
    var y = random(-200, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
}
  zombie = createSprite(width / 2, height - 50);
  zombie.addAnimation("lefttoright", zombie3, zombie4, zombie3);
  zombie.addAnimation("rightoleft", zombie1, zombie2, zombie1);
  zombie.scale = 0.1;
  zombie.velocityX = 10;
  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgrnd);
  Engine.update(engine);
  bridge.show();

  for(var stone of stones){
    stone.display();
  }
  if(zombie.position.x > width-300){
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }
  if(zombie.position.x < 300){
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }
  drawSprites();
}

function handleButtonPress(){
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
