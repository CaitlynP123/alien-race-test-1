var gameState = 0
var powerState = 'OFF'
var speedState = 'OFF'
var scoreState = 'OFF'
var shipState = 'OFF'
var questionState = 0

var bg, edges

var rocket
var rocketBeam, rocketBeamGroup
var rocketImg1, rocketImg2

var spaceship, beamGroup, spaceshipGroup
var spaceshipImg1, spaceshipImg2
var ship, beam

var alienImg1, alienImg2, alienImg3, alienImg4, alienGroup

var laserImg1, laserImg2

var slowDown, slowDownGroup
var scoreMultiply, scoreMultiplyGroup
var powerUpImg1, powerUpImg2, powerUpImg3
var powerUp1, powerUp2, powerUp3

var powerDownImg1, powerDownImg2, powerDownImg3
var speedUp, speedUpGroup
var scoreDeduct, scoreDeductGroup

var spriteGroup

var heading, question, output, next, ans, result
var op1, op2, op3, op4

var score = 5
var lives = 3

var questions

function preload(){
  bg = loadImage("Images/Space-Background.jpg")

  rocketImg1 = loadAnimation("Images/rocket-1-1.png","Images/rocket-1-2.png","Images/rocket-1-3.png"
  ,"Images/rocket-1-4.png")

  laserImg1 = loadImage("Images/LaserBeam1.png")
  laserImg2 = loadImage("Images/LaserBeam2.png")

  powerUpImg1 = loadImage("Images/Power-up.png")
  powerUpImg2 = loadImage("Images/Speed-Down.png")
 
  powerDownImg1 = loadImage("Images/Power-Down-1.png")
  powerDownImg2 = loadImage("Images/Speed-Up.png")
  powerDownImg3 = loadImage("Images/LaserBeam2.png")

  alienImg1 = loadImage("Images/alien_1.png")
  alienImg2 = loadImage("Images/alien_2.png")
  alienImg3 = loadImage("Images/alien_3.png")
  alienImg4 = loadImage("Images/alien_4.png")

  spaceshipImg1 = loadImage("Images/space-ship-1.png")
  spaceshipImg2 = loadImage("Images/space-ship-2.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  alienGroup = createGroup()
  
  slowDownGroup = createGroup()
  scoreMultiplyGroup = createGroup()

  speedUpGroup = createGroup()
  beamGroup = createGroup()
  spaceshipGroup = createGroup()
  scoreDeductGroup = createGroup()
  spriteGroup = createGroup()

  rocket = new Rocket(width/2, height-100)
  rocketBeamGroup = createGroup()
  alien = new Alien(0)

  questions = new Questions()
  
  question = createElement('h2')
  heading = createElement('h1')
  output = createElement('h2')
 
  op1 = createButton("")
  op2 = createButton("")
  op3 = createButton("")
  op4 = createButton("")
  //next = createButton("")

  edges = createEdgeSprites()    

    powerUp1 = createSprite(width+10, height-575)
    powerUp1.addImage("1",powerUpImg1)
    powerUp1.scale = 0.5
    spriteGroup.add(powerUp1)

    powerUp2 = createSprite(width+10, height-525)
    powerUp2.addImage("2",powerUpImg2)
    powerUp2.scale = 0.5
    spriteGroup.add(powerUp2)
    
    powerDown1 = createSprite(width+10, height-475)
    powerDown1.addImage("1",powerDownImg1)
    powerDown1.scale = 0.5
    spriteGroup.add(powerDown1)

    powerDown2 = createSprite(width+10, height-425)
    powerDown2.addImage("2",powerDownImg2)
    powerDown2.scale = 0.5
    spriteGroup.add(powerDown2)

    powerDown3 = createSprite(width+10, height-375)
    powerDown3.addImage("3",powerDownImg3)
    powerDown3.scale = 0.5
    spriteGroup.add(powerDown3)

}

function draw(){
  background(bg)

  if(gameState == 0){
    fill("white")
    textSize(25)
    text("You are an alien sent on a mission to learn about planets.", windowWidth-1350,windowHeight-600)
    text("While navigating the perils of outer space,your spaceship is ", windowWidth-1350,windowHeight-570) 
    text("spotted	and reported to all planets in your vicinity. Since",windowWidth-1350,windowHeight-540)
    text("they can't directly prevent you from reaching their planet,",windowWidth-1350,windowHeight-510)
    text("because of space laws, they sent out obstacles to stop and",windowWidth-1350,windowHeight-480)
    text("confuse you. You have to dodge whatever they send your way. But",windowWidth-1350,windowHeight-450)
    text("if you can't, remember, these obstacles contain questions to",windowWidth-1350,windowHeight-420)
    text("stall your arrival, if you choose the correct option you can",windowWidth-1350,windowHeight-390)
    text("move on with your journey. You can only get question wrong",windowWidth-1350,windowHeight-360)
    text("thrice,	otherwise you have to head back to your planet and try",windowWidth-1350,windowHeight-330)
    text("again later.",windowWidth-1350,windowHeight-300)

    text("Press Enter to continue", windowWidth-1350,windowHeight-180)

    powerUp1.x = width-585
    powerUp2.x = width-585
    powerDown1.x = width-585
    powerDown2.x = width-585
    powerDown3.x = width-585
 
    textSize(20)
    text("= This power-up increases the score", windowWidth-560,windowHeight-570)
    text("= This power-up slows down the aliens", windowWidth-560,windowHeight-520) 
    text("= This power-down summons a spaceship that shoots lasers",windowWidth-560,windowHeight-470)
    text("= This power-down speeds up aliens",windowWidth-560,windowHeight-420)
    text("= This power-down decreases the score",windowWidth-560,windowHeight-370)
 
  } else{
      powerUp1.x = width+20
      powerUp2.x = width+20
      powerDown1.x = width+20
      powerDown2.x = width+20
      powerDown3.x = width+20  
  }

  if(keyDown("enter")){
    gameState = 1
  }

  if(gameState == 1){
    fill("white")
    textSize(25)
    text("Score : "+score, 25,30)
    text("Lives : "+lives, 25,60)


    rocket.sprite.collide(edges[0])
    rocket.sprite.collide(edges[1])

    if(frameCount % 300==0){
      spaceship = new Spaceship()
    }
  
    if(spaceshipGroup.isTouching(rocket.sprite)){
      spawnSpaceship()
      shipState = 'ON'
    }

    if(shipState=='ON'){
      ship.bounceOff(edges[0])
      ship.bounceOff(edges[1])   
      ship.x = rocket.sprite.x 
      rocketShoot()     
      createLasers()

     
    for(var i = 0; i<beamGroup.length; i++){
     if(beamGroup[i].isTouching(rocket.sprite)){
        beamGroup[i].destroy()
        score -=10
      }
    }
      setTimeout(setShipState,20000)
  }
  
    if(frameCount % 20==0){
    normalScore()
  }

  if(frameCount % 350 == 0){
    slowDown = new SlowDown()  
  }

  for(var i = 0; i<slowDownGroup.length;i++){
    if(slowDownGroup[i].isTouching(rocket.sprite)){
      powerState = 'ON'
      slowDownGroup[i].destroy()
    }
  }

  if(powerState=='ON'){
    slowDownEnemy()
    setTimeout(setSpeed,20000)
  }

  if(frameCount % Math.round(random(200,250)) == 0){
    speedUp = new SpeedUp()  
  }

  for(var i = 0; i<speedUpGroup.length;i++){
    if(speedUpGroup[i].isTouching(rocket.sprite)){
      powerState = 'SPEED'
      speedUpGroup[i].destroy()
    }
  }

  if(powerState=='SPEED'){
    speedUpEnemy()
    setTimeout(setSpeed,20000)
  }


  if(frameCount % Math.round(random(200,300))==0){
    scoreMultiply = new ScoreMultiply()
  }

  for(var i = 0; i<scoreMultiplyGroup.length;i++){
    if(scoreMultiplyGroup[i].isTouching(rocket.sprite)){
      scoreState = 'ON'
      scoreMultiplyGroup[i].destroy()
    }
  }

  if(scoreState=='ON'){
    scoreMultiplier()
    setTimeout(normalScore,20000)
  }

  if(frameCount % 250 == 0){
    scoreDeduct = new ScoreDeduct()
  }
  
  for(var i = 0; i<scoreDeductGroup.length;i++){
    if(scoreDeductGroup[i].isTouching(rocket.sprite)){
      scoreState = 'DEDUCT'
      scoreDeductGroup[i].destroy()
    }
  }

  if(scoreState=='DEDUCT'){
    scoreDeduction()
    setTimeout(normalScore, 20000)
  }

for(var i = 0; i < alienGroup.length; i++){
  if(alienGroup[i].isTouching(rocket.sprite)){
    score -=100
    alienGroup[i].destroy()
  } 
} 

  rocket.move()
  alien.spawnAlien()
  
  if(frameCount % 400==0){
    gameState = 2
  }

  if(score<=0 || lives==0){
    gameState = 3
  }
}

if(gameState== 2 && questionState==0){
  questions.allQuestions()
  question.show()
  
  heading.show()
  
  op1.show()
  op2.show()
  op3.show()
  op4.show()

  output.show()
}

if(questionState==1){
  question.hide()
 
  op1.hide()
  op2.hide()
  op3.hide()
  op4.hide()
}

if(gameState==3){
  textSize(200)
  fill("white")
  text("GAME OVER", 25, height/2)
  textSize(200)
  fill("black")
  text("GAME OVER", 35, height/2-10)
}
  drawSprites()
}

function slowDownEnemy(){
  alienGroup.setVelocityYEach(4)
}

function speedUpEnemy(){
  alienGroup.setVelocityYEach(16)
}

function setSpeed(){
  alienGroup.setVelocityYEach(8)
  powerState = 'OFF'
}

function scoreMultiplier(){
  score +=10
}

function scoreDeduction(){
  score -= 10
}

function normalScore(){
  score += 5
  scoreState = 'OFF'
}

function spawnSpaceship(){
  ship = createSprite(windowWidth/2, 150)        
  ship.velocityX = 8
  spaceshipGroup.destroyEach()

  var rand = Math.round(random(1,2))
  switch(rand){
      case 1 : ship.addImage("1", spaceshipImg1)
               ship.scale = 0.3
      break
      case 2 : ship.addImage("2", spaceshipImg2)
               ship.scale = 2.5
      break
  }   
}

function createLasers(){
  beam = createSprite(-34, 0)
  beam.scale = 0.5
  beam.velocityY = 8  
  beam.lifetime = 100
    if(frameCount % 25==0){
      beam.x = ship.x
      beam.y = ship.y
      beam.addImage("laserBeam", laserImg2)
  
      beamGroup.add(beam)
      if(beam.y<ship.y){
        beam.x != ship.x
        beam.y != ship.y
      }
    }
}

function setShipState(){
  shipState = 'OFF'
  beamGroup.destroyEach()
  ship.destroy()
}

function rocketShoot(){
    if(keyDown("space")){
      rocketBeam = createSprite(-34, 0)
    rocketBeam.scale = 0.5
    rocketBeam.velocityY = -8  
    rocketBeam.lifetime = 100
      if(frameCount % 25==0){
        rocketBeam.x = rocket.sprite.x
        rocketBeam.y = rocket.sprite.y
        rocketBeam.addImage("laserrocketBeam", laserImg1)
    
        rocketBeamGroup.add(rocketBeam)
        if(rocketBeam.y<rocket.sprite.y){
          rocketBeam.x != rocket.sprite.x
          rocketBeam.y != rocket.sprite.y
        }
      }
    }
}

function resetState(){
  gameState = 1
  questionState = 0
  output.html("")  
  console.log("W O R K I N G")
}

function hides(){
  
  console.log("working")

  heading.hide()
  output.hide()
      
  question.hide()
  
  op1.hide()
  op2.hide()
  op3.hide()
  op4.hide()

  next.hide()
  result.hide()
}