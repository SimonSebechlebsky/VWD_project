import {scene} from '../world.js'

import {IdleState} from "./states/move_person_states.js";
import Stickman from "../../models/stickman/index.js";

import {v4 as uuid} from 'https://cdn.skypack.dev/@lukeed/uuid';

class Person {

    constructor(inputHandler, position=[0,0,0]) {
        this.stickman = this._createStickman(position);
        this.moveState = new IdleState(this);
        this.inputHandler = inputHandler;
        this.uuid = uuid();
        this.nearbyObj = null;
    }

    _createStickman(position) {
        return new Stickman(scene, position, [255, 255, 255], (stickman) => stickman.idle());
    }

    tick(delta) {
        let input = this.inputHandler.getInput();
        this.moveState = this.moveState.update(input, delta);

        this.stickman.tick(delta);
        return input;
    }
}

export default Person;