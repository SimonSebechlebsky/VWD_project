import _ from 'https://cdn.skypack.dev/lodash';
import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";

import {PersonState} from "./person_state.js";
import {WORLD_SIZE} from "../../world.js";

class IdleState extends PersonState {

    constructor(person) {
        super(person);
        this.enter();
    }

    update(input) {
        let directionKeys = ['forward','backward', 'left', 'right'];

        if (_.intersection(input, directionKeys).length > 0) {
            if (input.includes('run')) {
                return new RunningState(this.person)
            }
            return new WalkingState(this.person);

        }
        return this;
    }

    enter() {
        this.person.stickman.idle();
    }

}


class WalkingState extends PersonState  {

    constructor(person) {
        super(person);
        this.enter();

        this.directions =  {
            forward: new THREE.Vector3(1,0,1),
            backward: new THREE.Vector3(-1,0,-1),
            left: new THREE.Vector3(1,0,-1),
            right: new THREE.Vector3(-1,0,1)
        }

        this.speed = 2;
    }

    _filterDirections(input) {
        let directionKeys = ['forward','backward', 'left', 'right'];

        return _.intersection(input, directionKeys);
    }

    canMove(vector) {
        let stickmanPosition = new THREE.Vector3().copy(this.person.stickman.position);
        let endPosition = stickmanPosition.add(vector);

        let worldEnd = WORLD_SIZE/2;

        return !(endPosition.x <= -worldEnd ||
            endPosition.x >= worldEnd ||
            endPosition.z >= worldEnd ||
            endPosition.z <= -worldEnd);

    }

    moveVector(input) {
       let moveVector = new THREE.Vector3(0,0,0);

       this._filterDirections(input).forEach((dir) => moveVector.add(this.directions[dir]));


       moveVector.normalize();
       moveVector.multiplyScalar(this.speed);

       return moveVector;
    }

    move(input) {
        let moveVector = this.moveVector(input);
        let canMove = this.canMove(moveVector);

        if (!canMove) {
            return;
        }
        this.person.stickman.move(this.moveVector(input));
        this.person.stickman.setOrientation(this._filterDirections(input));
    }

    update(input) {

        if (!this._filterDirections(input).length) {
            return new IdleState(this.person);
        }

        if (input.includes('run')) {
            return new RunningState(this.person);
        }

        this.move(input);

        return this;
    }

    enter() {
        this.person.stickman.walk();
    }

}


class RunningState extends WalkingState {

    constructor(person) {
        super(person);
        this.speed = 4;
        this.enter();
    }

    update(input) {
        if (!this._filterDirections(input).length) {
            return new IdleState(this.person);
        }

        if (!input.includes('run')) {
            return new WalkingState(this.person)
        }

        this.move(input);

        return this;
    }

    enter() {
        this.person.stickman.run();
    }

}


export {IdleState, RunningState, WalkingState};