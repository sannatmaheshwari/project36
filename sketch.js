var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  FoodStock=database.ref('Food');
  FoodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed = createButton("feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var refer= database.ref('feedtime')
  
 
  //write code to display text lastFed time here
  text("lastfedtime ",300,50)

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
 var food_stock_val = foodObj.getFoodStock()
 if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val*0)

 }else{
   foodObj.updateFoodStock(food_stock_val-1)
 }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  if(lastFed>=12){

  }else if(lastFed == 0)
  {
    text("last Feed : 12 AM",350,30)
  }
}
