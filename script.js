let side = 30;
let length = 20;//!!!!! ne attentive this length must match the length given to matrix in server.js
var socket = io();
let matrix = [];
let weather = "winter";
let winterColors = ['#acacac', '#effffd', '#B8FFF9', '#398AB9', '#42C2FF', "purple", "black", "yellow"];
let summerColors = ['#acacac', "green", "orange", 'red', 'blue', "purple", "black", "yellow"];
let add_elem = 'grass';
//! Setup function fires automatically
function setup() {
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let amenakerCountElement = document.getElementById('amenakerCount');
    let bombCountElement = document.getElementById('bombCount');
    let predatorCountElement = document.getElementById('predatorCount');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        amenakerCountElement.innerHTML = data.amenakerCounter;
        bombCountElement.innerHTML = data.bombCounter;
        predatorCountElement.innerHTML = data.predatorCounter;

        //add

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill(`${weather == "summer" ? summerColors[1] : winterColors[1]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill(`${weather == "summer" ? summerColors[2] : winterColors[2]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill(`${weather == "summer" ? summerColors[0] : winterColors[0]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill(`${weather == "summer" ? summerColors[3] : winterColors[3]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == '*') {
                    fill(`${weather == "summer" ? summerColors[5] : winterColors[5]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill(`${weather == "summer" ? summerColors[4] : winterColors[4]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill(`${weather == "summer" ? summerColors[7] : winterColors[7]}`);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill(`${weather == "summer" ? summerColors[6] : winterColors[6]}`);
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

socket.on("data", (data) => {
    matrix = data.matrix;
});

function clicked() {
    socket.emit("restart");
}
function winter() {
    weather = "winter";
}
function summer() {
    weather = "summer";
}
function kill() {
    socket.emit("kill");
}
function addGrassEater() {
    socket.emit("addGrassEater");
}

function mouseClicked() {
    if (mouseX <= length * side && mouseY <= length * side && mouseX >= 0 && mouseY >= 0) {
        console.log(matrix);
        let x = Math.floor(mouseX / side);
        let y = Math.floor(mouseY / side);
        //tests if the cell is empty
        if (matrix[y][x] == 0) {
            socket.emit("clickedMouse", { x, y, add_elem });
        }
    }
}

function addGrass() {
    add_elem = "grass";
}
function addPredator() {
    add_elem = "predator";
}

function getInputValue() {
    let inputVal = document.getElementById("inputId").value;
    //if it is number so if it could be converted into number it does so if not leaves it as text
    inputVal = parseInt(inputVal) ? parseInt(inputVal) : inputVal;
    if (inputVal && inputVal <= 100) {
        length = inputVal;
        socket.emit("inputLen", inputVal);
    } else {
        alert("input a number or the number under 100");
    }
}