
import Person from './person.js'

import KeyboardInputHandler from "../keyboard_input_handler.js";
import Stickman from "../../models/stickman/index.js";
import {scene} from "../world.js";

class MedicPerson extends Person {

    constructor() {
        super(new KeyboardInputHandler(), [0,0,0]);
    }

    _createStickman(position) {
        return new Stickman(scene, position, [51, 190, 255], (stickman) => stickman.idle());
    }
}

export default MedicPerson;