import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";
import {WORLD_SIZE} from "./world.js";


class LevelState {

    constructor(healthyPeopleCount, illPeopleCount) {
        this.medic = new MedicPerson();
        this.randomPeople = new Map();

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

    getIllPeopleCount() {
        return this.getIllPeople().size;
    }

    getVaccinatedPeopleCount() {
        let count = 0;
        for (let person of this.randomPeople.values()) {
            if (person.vaccinated) {
                count++;
            }
        }
        return count;
    }

    getVaccinablePeopleCount() {
        return this.getVaccinablePeople().size;
    }


    getIllPeople() {
        let illPeople = new Map();
        for (let person of this.randomPeople.values()) {
            if (person.healthState.name === 'ill') {
                illPeople.set(person.uuid, person);
            }
        }
        return illPeople;
    }

    getVaccinablePeople() {
        let vaccinablePeople = new Map();
        for (let person of this.randomPeople.values()) {
            if (person.healthState.name === 'healthy' || person.healthState.name === 'infected') {
                vaccinablePeople.set(person.uuid, person);
            }
        }
        return vaccinablePeople;
    }
}

export default LevelState;