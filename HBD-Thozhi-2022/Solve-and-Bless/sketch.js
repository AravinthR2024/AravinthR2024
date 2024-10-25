class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;
  }
}

let source;
let count = 100;
let solved = false;

let tiles = [];
let cols = 3;
let w, h;

let board = [];

function preload() {
  source = loadImage("./images/MyPapa.jpg");
  alert(source);
}

function setup() {
  createCanvas(400, 400);
  createPage();
  console.log(`COLS : ${cols}`);
}

function createPage() {
  w = width / cols;
  h = height / cols;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }

  tiles.pop();
  board.pop();
  board.push(-1);

  simpleShuffle(board);
}

function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(cols));
  moveBlock(r1, r2, arr);
}

function simpleShuffle(arr) {
  for (let i = 0; i < 1000; i++) {
    randomMove(arr);
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  if (!solved && count >= 0) count--;
  moveBlock(i, j, board);
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }

  if (isSolved()) {
    noLoop();
    solved = true;
    background(source);
    if (count >= 0) createWishButton("See the wish! 😍");
  }
}

function createWishButton(displayValue) {
  let button = createButton(displayValue);
  button.mousePressed(redirectToWish);
}

function redirectToWish() {
  window.open("./birthdaywish/index.html", "_self");
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

function moveBlock(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / cols);

  if (count == 0) {
    createWishButton("Skip and see wish! 🤗");
  }

  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}

function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}
