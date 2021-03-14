import LevelState from "./level_state.js";
import CountDown from './count_down.js';

import {scene} from './world.js';


class GameState {

    constructor() {
        this.levelState = new LevelState(15, 0);
        this.countDown = new CountDown(scene, () => {
            this.levelState.unpause();
        })
    }

    start() {
        this.countDown.start();
        document.getElementById("intro").style.display = 'none';
    }

    update(delta) {
        this.levelState.update(delta);
    }
}

export default GameState;