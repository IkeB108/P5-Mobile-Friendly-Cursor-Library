# P5 Mobile-Friendly Cursor Library
A Javascript library that helps P5JS work more consistently on mobile devices.
## Features
- Cursor behavior is generally more consistent between mobile devices and PCs
- `onMobile` variable tracks whether the user is on a touchscreen device
- Tracks swipe velocity
- Changes to the canvas
  - Canvas automatically fills the screen with a configurable aspect ratio (optional)
  - Canvas is automatically centered
  - Uses effective techniques to resize and re-center the canvas on window resizes and device rotations
- Use three fingers to open a poor man's Javascript console on mobile (optional)
- Right-clicking the canvas no longer opens the context menu (optional)
- The `cursorClick` function is only called after a short click (not just any mouse button release release like `mouseClicked()`) (has configurable settings)
- Now tracks whether left, middle, and right buttons are pressed, all at once
- Intuitive pass-in parameter tells you what mouse button was pressed or released ("left", "right", "middle", 4)
- Tracks cursor position at the last press
- See info about the cursor in real time with the .render() method
## Example
```javascript
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

```
## Syntax
