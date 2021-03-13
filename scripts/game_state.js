import LevelState from "./level_state.js";
import CountDown from './count_down.js'

import {scene} from './world.js'
import {CollisionDetection} from "./collision_detection.js";
import {DiseaseSpreading} from "./disease_spreading.js";


class GameState {

    constructor() {
        this.paused = true;
        this.levelState = new LevelState(20, 0);
        this.collisionDetection = new CollisionDetection(this.levelState);
        this.diseaseSpreading = new DiseaseSpreading(this.levelState, this.collisionDetection);
        this.countDown = new CountDown(scene, () => {
            this.paused = false;
            this.levelState.unpause();
        })

        this.collisionDetectionInterval = 0.3;
        this.deltaAcc = 0;
    }

    start() {
        this.countDown.start();
        document.getElementById("intro").style.display = 'none';
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

    endLevel(succesful) {
        // ...
        // game logic to stop everything

        let illPeopleCount = this.levelState.score.illPeopleCount;
        document.getElementById('levelMessage').innerHTML = succesful ? 'Good Job!' : 'Wanna try again?';
        document.getElementById('levelMessage').innerHTML = illPeopleCount;
        document.getElementById('levelEnd').style.display = 'block';
    }
}

export default GameState;