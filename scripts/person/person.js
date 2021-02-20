import {scene} from '../world.js'

import {IdleState, WalkingState, RunningState} from "./states/move_person_states.js";
import Stickman from "../../models/stickman/index.js";


class Person {

    constructor(inputHandler, position=[0,0,0]) {
        this.stickman = this._createStickman(position);
        this.moveState = new IdleState(this);
        this.inputHandler = inputHandler;
    }

    _createStickman(position) {
        return new Stickman(scene, position, [255, 255, 255], (stickman) => stickman.idle());
    }

    tick(delta) {
        this.moveState = this.moveState.update(this.inputHandler.getInput());
        this.stickman.tick(delta);
    }

}

export default Person;