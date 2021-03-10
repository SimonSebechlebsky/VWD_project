import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";
import {WORLD_SIZE} from "./world.js";
import {Score} from "./score.js";

import Virus from './virus.js'


class LevelState {

    constructor(initHealthyPeopleCount, initIllPeopleCount, virusInterval=[2,3]) {
        this.medic = new MedicPerson();
        this.randomPeople = new Map();
        this.virusInterval = virusInterval;
        this.nextVirusTime = null;
        this.viruses = [];
        this.paused = true;
        this.initIllPeopleCount = initIllPeopleCount;
        this.initHealthyPeopleCount = initHealthyPeopleCount;
        this.score = new Score(this.initIllPeopleCount, this.initHealthyPeopleCount);

        for (let i = 0; i < this.initHealthyPeopleCount; i++) {
            let person = new RandomPerson([
                this.randomCoordinate(),
                0,
                this.randomCoordinate()
            ]);
            this.randomPeople.set(person.uuid, person);
        }

        for (let i = 0; i < this.initIllPeopleCount; i++) {
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

    update(delta) {

        this.medic.tick(delta);
        Array.from(this.randomPeople.values()).forEach((person) => person.tick(delta));

        if (!this.paused) {
            this.viruses.forEach((virus) => virus.tick(delta));
            this.createVirusIfTime();
            this.removeOffViruses();
        }

    }

    pause() {
        this.paused = true;
        for (let person of this.randomPeople.values()) {
            person.inputHandler.beIdle()
        }

    }

    unpause() {
        for (let person of this.randomPeople.values()) {
            person.inputHandler.move();
        }
        this.paused = false;
        this.nextVirusTime = this.getNextVirusTime();
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
            this.viruses[0].destroy();
            this.viruses.shift();
        }
    }
}

export default LevelState;