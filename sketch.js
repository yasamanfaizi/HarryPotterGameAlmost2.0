
var score = 0
var timer = 120
var database
var playerCount = 0,state = 0
var count = 0

function preload(){
  forest = loadImage ("Forbidden_Forest.png")
  hp = loadImage("Harry.png")
  rw = loadImage("ron weasley.png")
  hg = loadImage("hermione.png")
  hogwarts = loadImage("hogwarts-castle-.jpg")
  DM = loadImage("Dementor.png")
  hpp = loadImage("harryspatronus.png")
  rwp = loadImage("rons patronous.png")
  hgp = loadImage("Hermions patronus.png")
}

function setup() {
  createCanvas(800,400);
  database = firebase.database()
  trail = createSprite(400,200,2800,400)
  
  player1 = createSprite(200,200)
  player1.addImage(hp)
  player1.scale = 0.5

  player2 = createSprite(400,200)
  player2.addImage(rw)
  player2.scale = 0.7

  player3 = createSprite(600,200)
  player3.addImage(hg)
  player3.scale = 0.45

  enemygroup = createGroup()

  propgroup1 = createGroup()

  propgroup2 = createGroup()

  propgroup3 = createGroup()
  

  edges = createEdgeSprites()
}

function draw() {
  background(255,255,255);  
  drawSprites();
  fill("white")
  textSize(25)
  getState()  
  text("Score: "+ score,5,50)
  if (state===0){
  trail.addImage(hogwarts)
  trail.scale = 0.3
  textSize(20)
  fill("white")
  text("Harry Potter",160,370)
  text("Ron Weasley",330,370)
  text("Hermione Granger",520,370)

  textSize(30)
  fill("white")
  text("Pick Your Character",280,40)
  if (mousePressedOver(player1) && count<=2){
    count++
    player = player1
    getCount()
    playerCount++
    updateCount(playerCount)
    player2.destroy()
    player3.destroy()
    player.setCollider("rectangle",0,0,200,600)
    player.x = 100
    player.y = 300
    player.scale = 0.29
  }
  if (mousePressedOver(player2) && count<=2){
    player = player2
    count++
    getCount()
    playerCount++
    updateCount(playerCount)
    player1.destroy()
    player3.destroy()
    player.x = 100
    player.y = 300
    player.setCollider("rectangle",0,0,140,400)
    player.scale = 0.5
  }
  if (mousePressedOver(player3) && count<=2){
    player = player3
    count++
    getCount()
    playerCount++
    updateCount(playerCount)
    player1.destroy()
    player2.destroy()
    player.scale = 0.3
    player.x = 100
    player.y = 300
    player.setCollider("rectangle",0,0,200,600)
  }
  if (playerCount===2){
    state = 1
    updateState(1)
  }
}
if (state===1){
    player.collide(edges)
    trail.addImage(forest)
    Dementor()
    timer = timer-0.03
    text("Time Remaining: "+ Math.round(timer), 5,80)
    trail.scale = 1.7
    player.velocityX = 0
    if (keyDown("left")){
      player.velocityX = -3
    }
    if (keyDown("right")){
      player.velocityX = 3
    }
    if (keyDown("e")&& keyDown("p")&& player === player1 && frameCount%50===0){
      prop1 = createSprite(30,270)
      prop1.addImage(hpp)
      prop1.scale = 0.3
      prop1.x = player.x
      prop1.velocityY = -7
      propgroup1.add(prop1)
      prop1.lifetime = 400/7
    }
    if (keyDown("e")&& keyDown("p")&& player === player2 && frameCount%50===0){
      prop2 = createSprite(30,270)
      prop2.addImage(rwp)
      prop2.scale = 0.2
      prop2.x = player.x
      prop2.velocityY = -7
      propgroup2.add(prop2)
      prop2.lifetime = 400/7
    }
    if (keyDown("e")&& keyDown("p")&& player === player3 && frameCount%50===0){
      prop3 = createSprite(30,270)
      prop3.addImage(hgp)
      prop3.scale = 0.1
      prop3.x = player.x
      prop3.velocityY = -7
      propgroup3.add(prop3)
      prop3.lifetime = 400/7 
    }
    if (propgroup1.isTouching(enemygroup)){
      enemygroup.destroyEach()
      propgroup1.destroyEach()
      score+=5
    }
    if (propgroup2.isTouching(enemygroup)){
      enemygroup.destroyEach()
      propgroup2.destroyEach()
      score+=5
    }
    if (propgroup3.isTouching(enemygroup)){
      enemygroup.destroyEach()
      propgroup3.destroyEach()
      score+=5
    }

    if (enemygroup.isTouching(player)){
      enemygroup.destroyEach()
      score-=2
    }
}
 
}

function Dementor(){
  if (frameCount%80 === 0){
    dm = createSprite(random(100,700),0)
    dm.addImage(DM)
    dm.scale = 0.4
    dm.velocityY = 6
    enemygroup.add(dm)
    dm.lifetime = 400/6 
  }
}
