//modules
const Grass = require("./modules/Grass.js");
const GrassEater = require("./modules/GrassEater.js");
const Amenaker = require("./modules/Amenaker.js");
const Bomb = require("./modules/bomb.js");
const random = require("./modules/random");
const Dog = require("./modules/Dog");


//server part
const express = require("express");
const Predator = require("./modules/Predator.js");
const Meat = require("./modules/Meat.js");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("."));
app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);

//arrays(GLOBAL)
grassArr = [];
grassEaterArr = [];
AmenakerArr = [];
bombArr = [];
predatorArr = [];
let matrixSize = 20;
dogArr = [];
meatArr = [];
matrix = [];

//generates the matrix
function matrixGenerator(
  matrixSize,
  grass,
  grassEater,
  amenaker,
  bomb,
  predator,
  dog,
  meat
) {
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let o = 0; o < matrixSize; o++) {
      matrix[i][o] = 0;
    }
  }
  for (let i = 0; i < grass; i++) {
    let customX = Math.floor(random(matrixSize)); // 0-9
    let customY = Math.floor(random(matrixSize)); // 4
    // console.log("custom coord" + customX, customY);
    matrix[customY][customX] = 1;
  }
  for (let i = 0; i < grassEater; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 2;
  }
  for (let i = 0; i < amenaker; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 3;
  }
  for (let i = 0; i < bomb; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = "*";
  }
  for (let i = 0; i < predator; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 4;
  }
  for (let i = 0; i < dog; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 5;
  }
  for (let i = 0; i < meat; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 6;
  }
}
matrixGenerator(matrixSize, 25, 13, 3, 1, 5, 2, 2);
//! Creating MATRIX -- END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 2) {
          var grassEater = new GrassEater(x, y);
          grassEaterArr.push(grassEater);
        } else if (matrix[y][x] == 1) {
          var grass = new Grass(x, y);
          grassArr.push(grass);
        } else if (matrix[y][x] == 3) {
          var amenaker = new Amenaker(x, y);
          AmenakerArr.push(amenaker);
        } else if (matrix[y][x] == "*") {
          let bomb = new Bomb(x, y);
          bombArr.push(bomb);
        } else if (matrix[y][x] == 4) {
          let pred = new Predator(x, y);
          predatorArr.push(pred);
        } else if (matrix[y][x] == 5) {
          let dog = new Dog(x, y);
          dogArr.push(dog);
        } else if (matrix[y][x] == 6) {
          let meat = new Meat(x, y);
          meatArr.push(meat);
        }
      }
    }
}
creatingObjects();

//main part updates automaticly
function game() {
  if (grassArr[0] !== undefined) {
    for (var i in grassArr) {
      grassArr[i].mul();
    }
  }
  if (grassEaterArr[0] !== undefined) {
    for (var i in grassEaterArr) {
      grassEaterArr[i].eat();
    }
  }
  if (AmenakerArr !== undefined) {
    for (let i in AmenakerArr) {
      AmenakerArr[i].eat();
    }
  }
  if (bombArr !== null && bombArr.length !== 0 && bombArr !== undefined) {
    for (let i in bombArr) {
      bombArr[i].eat();
    }
  }
  if (predatorArr !== undefined) {
    for (let i in predatorArr) {
      predatorArr[i].eat();
    }
  }
  if (dogArr !== undefined) {
    for (let i in dogArr) {
      dogArr[i].eat();
    }
  }
  if (meatArr !== undefined) {
    for (let i in meatArr) {
      meatArr[i].move();
    }
  }


//! Info/status to emit
let sendData = {
  matrix: matrix,
  grassCounter: grassArr.length,//
  amenakerCounter: AmenakerArr.length,//
  bombCounter: 1,// always 1
  grassEaterCounter: grassEaterArr.length,//
  predatorCounter: predatorArr.length,//
};
//sends the data
io.sockets.emit("data", sendData);
}
//restart
function aa(inputLen) {
  if (inputLen !== undefined) {
    matrixSize = inputLen;
  }
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      matrix[i][j] = 0;
    }
  } //empty matrix
  grassArr = [];
  grassEaterArr = [];
  AmenakerArr = [];
  bombArr = [];
  predatorArr = [];
  dogArr = [];
  meatArr = [];
  matrixGenerator(matrixSize, 25, 13, 3, 1, 5, 2, 2);
  creatingObjects();
}
io.on("connection", function (socket) {
  socket.on("restart", aa);
  socket.on("kill", kill);
  socket.on("addGrassEater", addGrassEater);
  socket.on("inputLen", aa);
  socket.on("clickedMouse", mouseClicked);
});

function mouseClicked(coords){
  switch(coords.add_elem){
    case "grass":
      console.log("addGrass" + coords.x + " :x " + coords.y + " " + coords.add_elem);
      matrix[coords.y][coords.x] = 1;
      let grass = new Grass(coords.x, coords.y);
      grassArr.push(grass);
      break;
    case "predator":
      console.log("addPredator " + coords.x + " :x " + coords.y + " " + coords.add_elem);
      matrix[coords.y][coords.x] = 4;
      let pred = new Amenaker(coords.x, coords.y);
      AmenakerArr.push(pred);
      break;
  }
}
//kills every object
function kill() {
  //empty the matrix
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      matrix[i][j] = 0;
    }
  }
  grassArr = [];
  grassEaterArr = [];
  AmenakerArr = [];
  bombArr = [];
  predatorArr = [];
  meatArr = [];
  dogArr = [];
}
//onclick adds random positioned grassEater
function addGrassEater() {
  let newX = Math.floor(random(matrixSize));
  let newY = Math.floor(random(matrixSize));
  matrix[newY][newX] = 2;
  let grassEater = new GrassEater(newX, newY);
  grassEaterArr.push(grassEater);
}

setInterval(game, 800);
