
import {PersonState} from "./person_state.js";

class IdleState extends PersonState {

    constructor(person) {
        super(person);
        this.enter();
    }
    update(input) {
        return this;
    }

    enter() {
        this.person.stickman.idle();
    }

}

class RunningState extends PersonState {

}


class WalkingState extends PersonState  {

}


export {IdleState, RunningState, WalkingState};