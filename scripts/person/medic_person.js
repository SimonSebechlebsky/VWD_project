
import Person from './person.js'

import KeyboardInputHandler from "../keyboard_input_handler.js";
import Stickman from "../../models/stickman/index.js";
import {scene, gameState, collisionDetection} from "../world.js";

class MedicPerson extends Person {

    constructor() {
        super(new KeyboardInputHandler(), [0,0,0]);
    }

    _createStickman(position) {
        return new Stickman(scene, position, [51, 190, 255], (stickman) => stickman.idle());
    }

    vaccinate() {
        let nearbyPeople = collisionDetection.findNearby(this.stickman.position.x, this.stickman.position.y,
            this.stickman.position.z);
        let people = gameState.randomPeople;
        if (nearbyPeople[0]) {
            for (let i = 0; i < people.length; i++) {
                if (people[i].uuid === nearbyPeople[0][0].id) {
                    people[i].vaccinated = true;
                    collisionDetection.remove(people[i].nearbyObj);
                }
            }
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