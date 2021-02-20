import {scene} from '../world.js'

import {IdleState, WalkingState, RunningState} from "./states/move_person_states.js";
import Stickman from "../../models/stickman/index.js";


class Person {

    constructor(inputHandler) {
        this.stickman = this._createStickman();
        this.moveState = new IdleState(this);
        this.inputHandler = inputHandler;
    }

    _createStickman() {
        return new Stickman(scene, [0,0,0], [255, 255, 255], (stickman) => stickman.idle());
    }

    tick(delta) {
        this.moveState = this.moveState.update(this.inputHandler.getInput());
        this.stickman.tick(delta);
    }

}

export default Person;