import LevelState from "./level_state.js";
import CountDown from './count_down.js'

import {scene} from './world.js'
import {CollisionDetection} from "./collision_detection.js";


class GameState {

    constructor() {
        this.paused = true;
        this.levelState = new LevelState(20);
        this.collisionDetection = new CollisionDetection(this.levelState);
        this.countDown = new CountDown(scene, () => {
            this.paused = false;
            this.levelState.unpause();
        });
    }

    play() {
        this.countDown.start();
        document.getElementById("background").style.display = 'none';
    }

    update(delta) {
        this.levelState.updatables().forEach((updatable) => updatable.tick(delta));
        this.collisionDetection.update();
    }
}

export default GameState;