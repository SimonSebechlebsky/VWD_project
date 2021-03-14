import LevelState from "./level_state.js";
import CountDown from './count_down.js';

import {scene} from './world.js';


class GameState {

    constructor() {
        this.levelState = null;
        this.countDown = new CountDown(scene, () => {
            this.levelState.unpause();
        })
    }

    createLevelState() {
        this.levelState = new LevelState(20, 0);
        console.log(this.levelState);
    }

    start() {
        this.countDown.start();
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
}

export default GameState;