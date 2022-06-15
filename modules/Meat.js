const LiveForm = require("./LiveForm");
const random = require("./random");

module.exports = class Meat extends LiveForm{
    constructor(x,y){
        super(x,y);
        this.energy = 25;
        this.multiply = 0;
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
    };

    move() {
        this.energy--;
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)).concat(this.chooseCell(3)));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        if(this.energy < 1){
            this.die();
        }
        this.mul();
    }


    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 25 && newCell) {
            var meat = new Meat(newCell[0], newCell[1]);
            meatArr.push(meat);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }
    die(){
        if (this.energy == 0) {
            for (var i in meatArr) {
                if (this.x == meatArr[i].x && this.y == meatArr[i].y) {
                    meatArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }
}