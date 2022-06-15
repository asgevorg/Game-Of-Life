const LiveForm = require("./LiveForm");
const grassEater = require("./GrassEater.js");


module.exports = class Bomb extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }

    newCell() {
        let found = [];
        for (let i in this.directions) {
            let newX = this.directions[i][0];
            let newY = this.directions[i][1];
            // if(newX == 1 && newY == 1){
            //     found.push({x: newX, y: newY,});
            // }
            if(newX == matrix.length || newX < 0){
                newX = 19;
            }else if(newY == matrix.length || newY < 0){
                newY = 19;
            }
            found.push({ x: newX, y: newY, });

        }
        if (found.length == 8) {
            return found;
        } else {
            return [];
        }
    }
    eat() {
        let add = new Promise(() => {
            let newCells = this.newCell();
            for (let i in newCells) {
                setInterval(() => {
                    matrix[newCells[i].y][newCells[i].x] = 2;
                    let GrassEater = new grassEater(newCells[i].x, newCells[i].y);
                    grassEaterArr.push(GrassEater);
                }, 6000);
            }
            if (bombArr.length > 0) {
                bombArr.pop();
            } else {
                bombArr = null;
            }
        });
        add.then(() => {
            matrix[this.y][this.x] = 0;
        });
    }
    // die(){
    //   clearInterval();

    //   for(let i in matrix){
    //     for(let j in matrix[i]){
    //         matrix[j][i] = 0;
    //     }
    //   }

    // }
}
