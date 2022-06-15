const LiveForm = require("./LiveForm");
const random = require("./random.js");

module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
        this.multiply = 0;
    }
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.mul()
        }
        else {
            if (this.energy < 1) {
                this.die();
            }
            this.move();
        }
    }
    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 6 && newCell) {
            var pred = new Predator(newCell[0], newCell[1]);
            predatorArr.push(pred);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }
    }

    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}