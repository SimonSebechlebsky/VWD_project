import LevelState from "./level_state.js";
import CountDown from './count_down.js'

import {scene} from './world.js'
import {CollisionDetection} from "./collision_detection.js";
import {DiseaseSpreading} from "./disease_spreading.js";


class GameState {

    constructor() {
        this.paused = true;
        this.levelState = new LevelState(30, 0);
        this.collisionDetection = new CollisionDetection(this.levelState);
        this.diseaseSpreading = new DiseaseSpreading(this.levelState, this.collisionDetection);
        this.countDown = new CountDown(scene, () => {
            this.paused = false;
            this.levelState.unpause();
        })

        this.collisionDetectionInterval = 0.3;
        this.deltaAcc = 0;
    }

    play() {
        this.countDown.start();
        document.getElementById("background").style.display = 'none';
    }

    update(delta) {
        this.levelState.update(delta)

        this.deltaAcc += delta;
        if (this.deltaAcc > this.collisionDetectionInterval) {
            // console.log('colision update');
            this.collisionDetection.update();
            this.diseaseSpreading.update();
            this.deltaAcc = 0;
        }
    }
}

export default GameState;