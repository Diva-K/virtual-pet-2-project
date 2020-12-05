var dog, dogImg,happyDogImg, database, foodS, foodStock;
var feedBtn, addFoodBtn,fedTime, lastFed,foodObj;

function preload()
{
 
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
 
}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();
  dog = createSprite(250,250)
  dog.addImage("dog",dogImg)
  dog.addImage("doghappy",happyDogImg)
  dog.scale = 0.2;
  getFoodStock();
  

 
  //create feedBtn and addFoodBtn and position them on the screen

  feedBtn=createButton("feed")
  feedBtn.position(700,100)

  addFoodBtn=createButton("add food")
  addFoodBtn.position(600,100)
  
  //create new Food Object called foodObj

  foodObj=new Food()
  
}


function draw() {  

  background(46, 139, 87);
  fill("red")
  stroke("white")
  text("Press UP ARROW TO FEED DOG", 150, 50);
  
  
  foodObj.foodStock = foodS;
  //display foodObj
  foodObj.display

  foodObj.foodStock = foodS;
  foodObj.display();
  database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
    showTime(lastFed);
  });
    
 
  // call addFoodBtn 's mousePressed and call getFoodStock() and addFood(foodS);;
  addFoodBtn.mousePressed(function(){
    getFoodStock()
    addFood(foodS)

    
  })
    
  //call feedBtn's mousePressed function and call getFoodStock(); and feedDog();

  feedBtn.mousePressed(function(){
    getFoodStock()
    feedDog()
  })
  
  drawSprites();
  

}


function showTime(time){
//Look at the hint and fill the code for the func
if(time>=12){
text("lastFed:",+time%12+"pm",350,300)
}

else if(time===0){
  text("lastFed:",+time+"am",350,300)
}

else{ text("lastFed:",+time+"am",350,300)}
}

function addFood(f){
  f++;
  database.ref('/').update({
    food : f
  })
}
function getFoodStock(){
  database.ref("food").on("value",function(data){
    foodS = data.val();
  })
}
function feedDog(){
  foodS--
  database.ref("/").update({
    FeedTime:hour(),
    food:foodS
  })
}
