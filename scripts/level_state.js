import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";
import {WORLD_SIZE} from "./world.js";

import Virus from './virus.js'


class LevelState {

    constructor(healthyPeopleCount, illPeopleCount, virusInterval=[5,8]) {
        this.medic = new MedicPerson();
        this.randomPeople = new Map();
        this.virusInterval = virusInterval;
        this.nextVirusTime = this.getNextVirusTime()
        this.viruses = [];


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

    getNextVirusTime() {
        return Date.now() + this.virusInterval[0]*1000 + Math.random()*(this.virusInterval[1]-this.virusInterval[0])*1000;
    }


    updatables() {
        return [this.medic, ...Array.from(this.randomPeople.values()), ...this.viruses];
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

    createVirusIfTime() {
        if (Date.now() > this.nextVirusTime) {
            console.log(this.viruses);
            this.nextVirusTime = this.getNextVirusTime();
            this.viruses.push(new Virus());
        }
    }

    removeOffViruses() {
        if (this.viruses.length === 0) {
            return;
        }

        if (this.viruses[0].model.position.x < -WORLD_SIZE) { // viruses have the same speed, they are sorted in the array
            this.viruses.shift();
        }
    }
}

export default LevelState;