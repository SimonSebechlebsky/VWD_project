import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";
import {WORLD_SIZE} from "./world.js";


class GameState {

    constructor() {
        this.medic = new MedicPerson();
        this.randomPeople = [];

        for (let i = 0; i < 20; i++) {
            this.randomPeople.push(new RandomPerson([
                this.randomCoordinate(),
                0,
                this.randomCoordinate()
            ]));
        }
    }

    randomCoordinate() {
        return Math.floor(Math.random()*(WORLD_SIZE-20)-WORLD_SIZE/2)
    }


    updatables() {
        return [this.medic, ...this.randomPeople];
    }
}

export default GameState;