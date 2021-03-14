import LevelState from "./level_state.js";
import CountDown from './count_down.js';

import {scene} from './world.js';


class GameState {

    constructor() {
        this.levelState = null;
        this.levelNum = 1;
        this.countDown = new CountDown(scene, () => {
            this.levelState.unpause();
        });
        this.initPeopleCount = 15;
        this.initVirusInterval = [2, 3];
        this.initVirusCount = 3;

    }

    createLevelState() {
        this.levelState = new LevelState(this.initPeopleCount, 0, this.initVirusInterval, this.initVirusCount);
        console.log(this.levelState);
    }

    start() {
        this.countDown.start(1);
        document.getElementById("intro").style.display = 'none';
    }

    update(delta, updateCallback) {
        if (this.levelState) {
            this.levelState.update(delta);

            if (updateCallback) {
                updateCallback(this.levelState);
            }
        }
    }

    playLevelAgain() {
        this.levelState = new LevelState(this.initPeopleCount, 0, this.initVirusInterval, this.initVirusCount);
        this.countDown.start(this.levelNum);
        document.getElementById('retryLevelButton').style.display = 'none';
        document.getElementById('nextLevelButton').style.display = 'none';
        document.getElementById('levelEnd').style.display = 'none';
    }

    playNextLevel() {
        this.initPeopleCount += 5;
        this.initVirusCount += 1;
        this.initVirusInterval[0] -= 0.2;
        this.initVirusInterval[1] += 0.2;
        this.levelNum++;
        this.levelState = new LevelState(this.initPeopleCount, 0, this.initVirusInterval, this.initVirusCount);
        this.countDown.start(this.levelNum);
        document.getElementById('nextLevelButton').style.display = 'none';
        document.getElementById('retryLevelButton').style.display = 'none';
        document.getElementById('levelEnd').style.display = 'none';
    }

}

export default GameState;