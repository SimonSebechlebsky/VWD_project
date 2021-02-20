
class RandomBotInputHandler {
    constructor(maxMoveInterval=2) {
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


    getInput() {
        if (new Date().getTime() >= this.nextChangeTime) {
            this.nextChangeTime = this.nextMoveTime();
            this.changeDirection();
        }
        return this.directions[this.directionIndex];
    }

}
export default RandomBotInputHandler;