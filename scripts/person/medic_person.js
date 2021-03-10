import Person from './person.js'

import KeyboardInputHandler from "../keyboard_input_handler.js";
import Stickman from "../../models/stickman/index.js";
import {scene, gameState} from "../world.js";

class MedicPerson extends Person {

    constructor() {
        super(new KeyboardInputHandler(), [0,0,0]);
        this.type = 'medic';
    }

    _createStickman(position) {
        return new Stickman(scene, position, [51, 190, 255], (stickman) => stickman.idle());
    }

    vaccinate() {
        let nearbyPeople = gameState.collisionDetection.findNearby(this.stickman.position.x, this.stickman.position.y,
            this.stickman.position.z);
        let people = gameState.levelState.randomPeople;
        if (nearbyPeople[0]) {
            let nearbyPerson = people.get(nearbyPeople[0].id);
            nearbyPerson.vaccinated = true;
            gameState.collisionDetection.remove(nearbyPerson.nearbyObj);
            gameState.levelState.score.updateVaccinatedPeopleCount();
            gameState.levelState.score.updateVaccinablePeopleCount();
        }
    }

    tick(delta) {
        let input = super.tick(delta);

        if (input.includes("space")) {
            this.vaccinate();
        }
    }
}

export default MedicPerson;