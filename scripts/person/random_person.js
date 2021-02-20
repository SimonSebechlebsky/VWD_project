import Person from './person.js';
import {HealthyPersonState, IllPersonState, InfectedPersonState, ImmunePersonState} from "./states/health_person_states.js";
import Stickman from "../../models/stickman/index.js";
import {scene} from "../world.js";
import KeyboardInputHandler from "../keyboard_input_handler.js";

class RandomPerson extends Person {

    constructor() {
        super(new KeyboardInputHandler());
        this.healthState = new InfectedPersonState(this);
        this.infected = false;
        this.vaccinated = false;
    }

    _createStickman() {

        return new Stickman(scene, [100,100,0], [255, 255, 255], (stickman) => stickman.walk());
    }

    tick(delta) {
        this.healthState = this.healthState.update();
        this.stickman.tick(delta);
    }

    be_sick() {
        //this.healthState = new InfectedPersonState(this);
    }
}

export default RandomPerson;