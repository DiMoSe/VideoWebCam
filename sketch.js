/*
 *
 * Cinema Expandido WEB
 * Camara (10 de abril 2018)
 * Diego Morales Servin
 * 
 *;
 
 * URL: https://dimose.github.io/VideoWebCam/
 */

/*
VARIABLES
*/
var capture;
var video;
var tracker;

/*
LYFE CYCLE METHODS
*/

function preload() {
  video = createVideo("assets/videos/keyboard.mp4")
    //capture = createVideo("assets/videos/alien.mp4")
}

function setup() {
  background(0);
  imageMode(CENTER);
  createCanvas(1280, 720);
  initializeCamera();
  initializeVideo();
  initializeTracker();
}

function draw() {
  background(0);
  drawVideo();
  drawCamera();
  drawTracker();
  print(frameRate);
}

/*
CAMERA METHODS
*/


function initializeCamera() {
  capture = createCapture(VIDEO);
  capture.hide();
  capture.loop();
}


function drawCamera() {
  image(capture, mouseX, mouseY, 480, 270);
}


function initializeVideo() {
  video.hide();
  video.loop();
}

function drawVideo() {
  var positions2 = tracker.getCurrentPosition();

  if (positions2.length > 0) {
    var differenceW = (positions2[14][0]) - (positions2[0][0]);
    var differenceH = (positions2[7][1]) - (positions2[33][1]);
    var zomw = round(map(differenceW, 0, 200, 0, 800));
    
    image(video, windowWidth/2,windowHeight/2,zomw,zomw);
  }
}
/*
TRACKER METHODS
*/

function initializeTracker() {
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function drawTracker() {
  var positions = tracker.getCurrentPosition();
  if (positions.length > 0) {
    for (var i = 0; i < positions.length; i++) {
      fill(255, 0, 0);
      ellipse(positions[i][0], positions[i][1], 10, 10)
    }
  }
}