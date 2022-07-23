function setup(){
  
  let mySettings = {
    threeFingerConsole: true,
    minAspectRatio: 1/2, //canvas width will be no smaller than half the height
    maxAspectRatio: 2 //canvas width will be no larger than twice the height
  }
  
  myCursor = new MobileFriendlyCursor( mySettings );
  
  textSize(30)
}

function draw(){
  background(0)
  
  fill("white");
  text("There are " + myCursor.allCursors.length + " cursors\nTry pressing any mouse button", 50, 50 )
  
  //Draw circles that show which mouse buttons are being pressed
  
  if( myCursor.leftPressed )fill("green")
  else fill('white')
  ellipse(width/2, height * (1/4) , 100)
  
  if( myCursor.middlePressed )fill("blue")
  else fill('white')
  ellipse(width/2, height * (2/4) , 100)
  
  if( myCursor.rightPressed )fill("red")
  else fill('white')
  ellipse(width/2, height * (3/4) , 100)
  
  //Draw a circle at the position of all cursors
  for(let i in myCursor.allCursors){
    
    if( myCursor.pressed )fill("gray")
    else fill("white")
    ellipse(myCursor.allCursors[i].x, myCursor.allCursors[i].y, 100)
    
  }
  
  myCursor.update();
}