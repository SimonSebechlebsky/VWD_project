import {scene} from '../world.js'

import {IdleState, WalkingState, RunningState} from "./states/move_person_states.js";
import Stickman from "../../models/stickman/index.js";


class Person {

    constructor(inputHandler) {
        this.stickman = this._createStickman();
        this.speed = 0;
        this.direction = [0,0,0];
        this.moveState = new IdleState(this);

        this.inputHandler = inputHandler;
    }

    _createStickman() {
        return new Stickman(scene, [0,0,0], 0xFFFFFF);
    }

    tick(delta) {
        let prevMoveState = this.moveState;
        // this.moveState = this.moveState.update(this.inputHandler.getInput());
        if (prevMoveState.name() !== this.moveState.name()) {
            this.moveState.enter();
        }
        this.stickman.tick(delta);

        this.checkMoveState();
    }

    checkMoveState() {

    }
}

export default Person;