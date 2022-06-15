const GrassEater = require("./GrassEater");
let LiveForm = require("./LiveForm");
const Predator = require("./Predator");
let random = require("./random");

module.exports = class Amenaker extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
        this.multiply = 0;
    }
    eat() {
        let newCell = random(this.chooseCell(2).concat(this.chooseCell(1).concat(this.chooseCell("*")).concat(this.chooseCell(4))));
        //eating if there are cells, he eats if there are no he moves
        if (newCell != undefined) {
            this.energy++;
            //newX and newY are the new coordinates
            let newX = newCell[0];
            let newY = newCell[1];
            //here it moves from a cell to another

            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (let i in bombArr) {
                if (bombArr[i].x == newX && bombArr[i].y == newY) {
                    bombArr.splice(i, 1);
                    break;
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;

            if (this.energy > 5) {
                this.mul();
            }
        } else {
            this.move();
        }
    }
    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 30 && newCell) {
            let pr = new Amenaker(newCell[0], newCell[1], this.index);
            AmenakerArr.push(pr);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }

    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        if (this.energy < 1) {
            this.die();
        }
    }
    die() {
        for (var i in AmenakerArr) {
            if (this.x == AmenakerArr[i].x && this.y == AmenakerArr[i].y) {
                AmenakerArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}