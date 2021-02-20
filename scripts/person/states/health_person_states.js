import {PersonState} from "./person_state.js";


class HealthyPersonState extends PersonState {
    constructor(person) {
        super(person);
        this.enter();
    }

    update() {

        if (this.person.infected) {
            return new InfectedPersonState(this.person);
        }
        return this;
    }

    enter() {
        this.person.stickman.color = [255, 255, 255];
    }
}


class IllPersonState extends PersonState {
    constructor(person) {
        super(person);
        this.illFrom = Date.now();
        this.enter();
    }

    update() {
        if (Date.now() > this.illFrom + 10000) {
            return new ImmunePersonState(this.person);
        }
        return this;
    }

    enter() {
        this.person.stickman.setColor([255, 0, 0]);
    }

}

class InfectedPersonState extends PersonState {
    constructor(person) {
        super(person);
        this.infectedFrom = Date.now();
        this.enter();
    }

    update() {
        // rgb(255, 230, 230)
        // rgb(255, 77, 77)

        let val = (1 - (Date.now() - this.infectedFrom) / 5000) * 153;
        let r = 255;
        let g = Math.round(val) + 77;
        let b = Math.round(val) + 77;

        if (Date.now() > (this.infectedFrom + 5000)) {
            return new IllPersonState(this.person);
        }
        if (this.person.stickman.loaded) {
            this.person.stickman.setColor([r, g, b]);
        }

        return this;
    }

    enter() {
        this.person.stickman.color = [255, 230, 230];
    }
}

class ImmunePersonState extends PersonState {
    constructor(person) {
        super(person);
        this.enter();
    }

    update() {
        return this;
    }

    enter() {
        this.person.stickman.setColor([255, 185, 15]);
    }
}

export {HealthyPersonState, IllPersonState, InfectedPersonState, ImmunePersonState};