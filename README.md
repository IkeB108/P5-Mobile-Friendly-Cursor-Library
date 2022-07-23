# P5 Mobile-Friendly Cursor Library
A Javascript library that makes it easier to make P5JS sketches for mobile devices.
## Differences from Normal P5JS
- `onMobile` property tracks whether the user is on a touchscreen device
- `swipeVelocity` property tracks velocity when user swipes
- Changes to the canvas:
  - Canvas automatically fills the screen with a configurable aspect ratio (optional)
  - Canvas is automatically centered
  - Uses effective techniques to resize and re-center the canvas on window resizes and device rotations
- Cursor behavior is generally more consistent between mobile devices and PCs
- Use three fingers to open a poor man's Javascript console on mobile (optional)
- Right-clicking the canvas no longer opens the context menu (optional)
- The `cursorClick` function is only called after a short click (not just any mouse button release release like `mouseClicked()`) (has configurable settings)
- Now tracks whether left, middle, and right buttons are pressed, all at once
- Intuitive pass-in parameter tells you what mouse button was pressed or released ("left", "right", "middle", 4)
- Tracks cursor position at the last press
- See info about the cursor in real time with the .render() method
## Example
[Click here](https://ikeb108.github.io/P5-Mobile-Friendly-Cursor-Library/Example/) to see this example run live
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

function cursorPressStart(buttonPressed){
  console.log("the " + buttonPressed + " button was pressed")
}
function cursorPressEnd(buttonReleased){
  console.log("the " + buttonReleased + " button was released")
}

```
## Syntax
Add this line to your setup function:

`myCursor = new MobileFriendlyCursor( [mySettings] )`

`mySettings` is an optional parameter. It should be an object with any of the properties shown below (as many or as few as you like). Any settings not included in your settings object will default to the values shown below.
### Default settings:
```javascript
let mySettings = {
  logEvents: false, //Boolean. When true, mouse events are logged to the console.
  disableContextMenu: true, //Boolean. When true, right clicking the canvas will not open the context menu
  minAspectRatio: 1/3, //Number. The minimum allowed width-to-height aspect ratio of the canvas.
  maxAspectRatio: 2/3, //Number. The maximum allowed width-to-height aspect ratio of the canvas.
  manualSize: false, //Boolean. When true, the canvas will not automatically be resized. The canvas width and height will be whatever you write in createCanvas()
  marginInPixels: 20, //Number. The size of the margin between the canvas and the edge of the window.
  threeFingerConsole: false, //Boolean. When true, on mobile, pressing three fingers on the canvas will open a poor man's Javascript console (a pop-up dialog), and errors will also appear as pop-up dialogs (but not on PC)
  swipeOnButton: "left", //String. Name of the mouse button that counts as a "swipe" (taps on mobile devices count as a left mousebutton press)
  swipeDeceleration: 0.9, //Number. Once per frame, the swipe velocity is multiplied by this value.
  maxClickDistance: window.innerWidth/10, //Number. If the cursor travels further than this value while pressed, it will not count as a click (but it will count as a press)
  maxClickTime: 600, //Number (milliseconds). If the cursor is pressed for longer than this, it will not count as a click (but it will count as a press)
}
```
## Features
- Your `MobileFriendlyCursor` object has helpful properties for you to use:
  - `x`: X coordinate of the cursor on the canvas
  - `y`: Y coordinate of the cursor on the canvas
  - `leftPressed` (boolean)
  - `middlePressed` (boolean)
  - `rightPressed` (boolean)
  - `pressed`: (boolean; stores whether any button is pressed)
  - `onMobile`: Boolean storing whether the user is on a touchscreen device
  - `previous`: An object storing the x and y coordinates of the cursor at the previous frame*
  - `atPress`: An object storing the x and y coordinates of the cursor at the last press start
  - `swipeVelocity`: An object storing the x and y velocities of the user's last swipe*
  - `allCursors`: An array of objects that store the positions of all cursors (there will be several if multiple fingers are pressed on mobile)
  - `render()`: A method that draws information about your cursor to the canvas.

*This feature requires you to call the MobileFriendlyCursor's `.update()` method in your draw loop.

## New Event Functions
These functions are called after specific mouse events, similar to how `mouseClicked()` works in P5JS.
All of these functions will be passed a parameter stating which mouse button was pressed or released; it will be "left", "right", "middle", or a number (for mice that have extra buttons). On mobile devices, finger presses always count as "left" button presses.
```javascript
cursorPressStart( buttonPressed ) //On any device: triggered when any button is pressed
cursorPressEnd( buttonReleased ) //On any device: triggered when any button is released
cursorClick( buttonPressed ) //On any device: triggered when a mouse button is pressed and then quickly released
cursorMove() //On any device: triggered when the cursor moves (no button parameter is passed)

mousePressStart( buttonPressed ) //On PC only: triggered when any button is pressed
mousePressEnd( buttonReleased ) //On PC only: triggered when any button is released
mouseMove() //On PC only: triggered when the cursor moves (no button parameter is passed)

touchPressStart( buttonPressed ) //On mobile only: triggered when a finger is pressed
touchPressEnd( buttonPressed ) //On mobile only: triggered when a finger is released
touchMove() //On mobile only: triggered when a pressed finger moves
```
## Known Issues
Many of these issues are present in normal P5JS.
- On Apple devices:
  - On Microsoft Edge: Generally unpredictable behavior
  - On DuckDuckGo: swiping up and down causes the canvas to move around
  - Tapping once, then quickly tapping and holding can cause the cursor to freeze in some browsers
- Before the canvas loads, users can zoom and pan, but once the canvas loads, they no longer can (it may become permanently stuck). For this reason, using asynchronous loading instead of `preload()` is recommended (see my [asynchronous loading library](https://github.com/IkeB108/P5-Asynchronous-Loading-Library))
- Cursor teleports when releasing multiple fingers in an arbitrary order
- Opening the context menu (inside or outside the canvas) causes the cursor to teleport
- Cursor will stay "pressed" if pressed at the moment a dialogue window opens
