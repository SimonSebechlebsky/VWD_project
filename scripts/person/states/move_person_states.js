
import {PersonState} from "./person_state.js";

class IdleState extends PersonState {
    update() {

    }

    name() {
        'idle';
    }
}

class RunningState extends PersonState {

}


class WalkingState extends PersonState  {

}


export {IdleState, RunningState, WalkingState};