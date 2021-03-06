import Person from './person.js';
import {HealthyPersonState, InfectedPersonState, IllPersonState, ImmunePersonState, CuredPersonState} from "./states/health_person_states.js";
import Stickman from "../../models/stickman/index.js";
import {scene} from "../world.js";
import RandomBotInputHandler from "../random_bot_input_handler.js";

class RandomPerson extends Person {

    constructor(position= [0,0,0], healthState='healthy') {
        super(null, position);

        let healthStates = {
            'healthy': HealthyPersonState,
            'infected': InfectedPersonState,
            'ill': IllPersonState,
            'immune': ImmunePersonState,
            'cured': CuredPersonState
        }

        // can't be set via super constructor, "this" is not allowed before super
        this.inputHandler = new RandomBotInputHandler(this.stickman);
        this.healthState = new healthStates[healthState](this);
        this.infected = false;
        this.vaccinated = false;
        this.idle = true;
        this.type = 'random';
    }

    _createStickman(position) {
        return new Stickman(scene, position, [255, 255, 255], (stickman) => stickman.idle());
    }

    tick(delta) {
        super.tick(delta);
        this.healthState = this.healthState.update();
    }

    // beIdle() {
    //     this.idle = true;
    // }


    beInfected(illCallBack) {
        this.infected = true;
        this.illCallBack = illCallBack;
    }
}

export default RandomPerson;