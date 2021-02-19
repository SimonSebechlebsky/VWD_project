class State {
    constructor(person) {
        this.person = person;
    }

    update(input) {

    }

    enter() {

    }

}

class IdleState extends State {
    update() {

    }

    name() {
        'idle';
    }
}

class RunningState extends State {

}


class WalkingState extends State  {

}


export {State, IdleState, RunningState, WalkingState};