import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";
import {WORLD_SIZE} from "./world.js";


class LevelState {

    constructor(healthyPeopleCount, illPeopleCount) {
        this.medic = new MedicPerson();
        this.randomPeople = new Map();
        // this.illPeople = new Map();

        for (let i = 0; i < healthyPeopleCount; i++) {
            let person = new RandomPerson([
                this.randomCoordinate(),
                0,
                this.randomCoordinate()
            ]);
            this.randomPeople.set(person.uuid, person);
        }

        for (let i = 0; i < illPeopleCount; i++) {
            let person = new RandomPerson([
                this.randomCoordinate(),
                0,
                this.randomCoordinate()
            ], 'ill');
            this.randomPeople.set(person.uuid, person);
        }

    }

    randomCoordinate() {
        return Math.floor(Math.random()*(WORLD_SIZE-20)-WORLD_SIZE/2)
    }


    updatables() {
        return [this.medic, ...Array.from(this.randomPeople.values())];
    }

    pause() {
        for (let person of this.randomPeople.values()) {
            person.inputHandler.beIdle()
        }
    }

    unpause() {
        for (let person of this.randomPeople.values()) {
            person.inputHandler.move();
        }
    }
}

export default LevelState;