import {WORLD_SIZE} from "./world.js";

class RandomBotInputHandler {
    constructor(stickman, maxMoveInterval=2) {
        this.stickman = stickman;
        this.directions = [
            ['forward'],
            ['forward', 'right'],
            ['right'],
            ['right', 'backward'],
            ['backward'],
            ['backward', 'left'],
            ['left'],
            ['left','forward']
        ]

        this.directionIndex = Math.floor(Math.random() * this.directions.length);
        this.maxMoveInterval=maxMoveInterval*1000;
        this.nextChangeTime = this.nextMoveTime()
        this.nearEdge = false;

    }

    nextMoveTime() {
        return Date.now() + Math.random()*this.maxMoveInterval;
    }

    changeDirection() {
        this.directionIndex += Math.floor(Math.random() * 2)*2-1;
        if (this.directionIndex < 0) {
            this.directionIndex += this.directions.length;
        } else if (this.directionIndex >= this.directions.length) {
            this.directionIndex -= this.directions.length;
        }
    }

    checkMapBoundaries() {
        let mapEnd = WORLD_SIZE/2 - 20;
        let x = this.stickman.position.x;
        let z = this.stickman.position.z;
        let dirChanged = false;

        if (x <= -mapEnd && [2,3,4].includes(this.directionIndex)) {
            this.directionIndex = [6,7,0][Math.floor(Math.random() * 3)];
            dirChanged = true;
        } else if (x >= mapEnd && [6,7,0].includes(this.directionIndex)) {
            this.directionIndex = [2,3,4][Math.floor(Math.random() * 3)];
            dirChanged = true;
        } else if (z >= mapEnd && [0,1,2].includes(this.directionIndex)) {
            this.directionIndex = [4,5,6][Math.floor(Math.random() * 3)];
            dirChanged = true;
        } else if (z <= -mapEnd && [4,5,6].includes(this.directionIndex)) {
            this.directionIndex = [0,1,2][Math.floor(Math.random() * 3)];
            dirChanged = true;
        }

        if (dirChanged) {
            this.nextChangeTime = this.nextMoveTime();
        }
    }


    getInput() {

        this.checkMapBoundaries()
        if (new Date().getTime() >= this.nextChangeTime) {
            this.nextChangeTime = this.nextMoveTime();
            this.changeDirection();
        }
        return this.directions[this.directionIndex];
    }

}
export default RandomBotInputHandler;