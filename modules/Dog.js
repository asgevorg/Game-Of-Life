const LiveForm = require("./LiveForm");
const random = require("./random");
module.exports = class Dog extends LiveForm{
    constructor(x,y){
        super(x,y);
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.energy = 10;
        this.multiply = 0;
    };
    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
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
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 6 && newCell) {
            var dog = new Dog(newCell[0], newCell[1], this.index);
            dogArr.push(dog);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0;
        }
    }

    move() {
        this.energy--;
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    die() {
        if (this.energy == 0) {
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }
}
