import Person from './person.js';
import {HealthyPersonState, IllPersonState, InfectedPersonState, ImmunePersonState} from "./states/health_person_states.js";
import Stickman from "../../models/stickman/index.js";
import {scene} from "../world.js";
import RandomBotInputHandler from "../random_bot_input_handler.js";

class RandomPerson extends Person {

    constructor() {
        super(new RandomBotInputHandler());
        this.healthState = new InfectedPersonState(this);
        this.infected = false;
        this.vaccinated = false;
    }

    _createStickman() {
        return new Stickman(scene, [0,0,0], [255, 255, 255], (stickman) => stickman.walk());
    }

    tick(delta) {
        super.tick(delta);
        this.healthState = this.healthState.update();
    }

    beSick() {
        //this.healthState = new InfectedPersonState(this);
    }
}

export default RandomPerson;