import LevelState from "./level_state.js";
import CountDown from './count_down.js'

import {scene} from './world.js'
import {CollisionDetection} from "./collision_detection.js";
import {DiseaseSpreading} from "./disease_spreading.js";


class GameState {

    constructor() {
        this.paused = true;
        this.levelState = new LevelState(30, 4);
        this.collisionDetection = new CollisionDetection(this.levelState);
        this.diseaseSpreading = new DiseaseSpreading(this.levelState, this.collisionDetection);
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
        this.diseaseSpreading.update();
        this.levelState.getIllPeopleCount();
        this.levelState.getVaccinatedPeopleCount();
        this.levelState.getVaccinablePeopleCount();
    }
}

export default GameState;