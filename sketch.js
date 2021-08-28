var space,spacebackground
var me,meImg
var enemy1Img,enemy2Img,enemy3Img,enemy4Img
var enemy,enemyGroup
var bullet,bulletImg,bulletGroup
var gameState = "PLAY";
function preload(){
spacebackground= loadImage("images/space background.jpg")
meImg = loadImage("images/space-shuttle.png")
enemy1Img = loadImage("images/enemy1.png")
enemy2Img = loadImage("images/enemy2.png")
enemy3Img = loadImage("images/enemy3.png")
bulletImg = loadImage("images/bullet.png")

}


function setup() {
  createCanvas(1200,displayHeight);
space = createSprite(1200/2,displayHeight/2)
space.addImage(spacebackground)
space.scale = 1
space.velocityY = 2
me = createSprite(600,890,0,0)
me.addImage(meImg)
me.scale= 0.5
bulletGroup = new Group()
enemyGroup = new Group()



}
function draw() {
  background("white");  
  
  if(gameState === "PLAY"){
    me.x = mouseX
    spawnEnemy()
    if(space.y === 800){
      space.y = space.width/2
    }
  
    if(keyWentDown("space")){
      kill()
    }
    for (var i = 0; i < 10; i++) {
    
      if(enemyGroup.get(i)!= null && enemyGroup.get(i).isTouching(bulletGroup)){
      enemyGroup.get(i).remove()
    bulletGroup.destroyEach()
     
    }
    }
    if(enemyGroup.isTouching(me)){
      gameState = "END"
    }
  }

  if(gameState === "END"){
  space.velocityY = 0
  enemyGroup.setVelocityYEach (0)
  }
  
  
  
  drawSprites();
  fill("green")
  textSize(20)
  text(mouseX+","+mouseY,mouseX,mouseY)
 
}
function spawnEnemy() {
  if(frameCount % 60===0){
  enemy = createSprite(random(50,1000),0,0,0)
  enemy.addImage(enemy3Img)
  enemy.scale = 0.8                                                                   
 enemy.velocityY=3
 var rand= Math.round(random(1,3) )
 
 switch(rand){
   case 1:enemy.addImage(enemy1Img)
   break;
   case 2:enemy.addImage(enemy2Img)
   break;
   case 3:enemy.addImage(enemy3Img)
   break;
   default:break;
 }
 enemyGroup.add(enemy)
  }
 
}
function kill(){
 
bullet = createSprite(me.x,me.y-100,0,0)
bullet.addImage(bulletImg)
 bullet.velocityY=-2
 bulletGroup.add(bullet)
}
 