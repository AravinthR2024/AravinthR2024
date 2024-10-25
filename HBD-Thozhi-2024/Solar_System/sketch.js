let sun;
let cam;

let sunTexture;
const textures = [];

function preload() {
  sunTexture = loadImage('data/center_sun.jpg');
  textures[0] = loadImage('data/mars.jpg');
  textures[1] = loadImage('data/earth.jpg');
  textures[2] = loadImage('data/mercury.jpg');
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  // Disable the context menu on the canvas so the camera can use the right mouse button
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });

  sun = new Planet(50, 0, 0, sunTexture);
  sun.spawnMoons(4, 1);
}

function draw() {
  background(0);
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 0);
  sun.show();
  sun.orbit();
}