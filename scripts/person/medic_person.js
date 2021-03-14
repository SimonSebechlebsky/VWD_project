import Person from './person.js'

import KeyboardInputHandler from "../keyboard_input_handler.js";
import Stickman from "../../models/stickman/index.js";
import {scene} from "../world.js";

class MedicPerson extends Person {

    constructor() {
        super(new KeyboardInputHandler(), [0,0,0]);
        this.type = 'medic';
    }

    _createStickman(position) {
        return new Stickman(scene, position, [51, 190, 255], (stickman) => stickman.idle());
    }

    vaccinate(nearbyPerson) {
        nearbyPerson.vaccinated = true;
    }

    tick(delta) {
        return super.tick(delta);
    }
}

export default MedicPerson;