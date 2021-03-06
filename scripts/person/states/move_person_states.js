import _ from 'https://cdn.skypack.dev/lodash';
import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";

import {PersonState} from "./person_state.js";
import {WORLD_SIZE} from "../../world.js";

class IdleState extends PersonState {

    constructor(person) {
        super(person);
        this.enter();
    }

    update(input, delta) {
        let directionKeys = ['forward','backward', 'left', 'right'];

        if (_.intersection(input, directionKeys).length > 0) {
            if (input.includes('run')) {
                return new RunningState(this.person)
            }


            if (this.person.type === 'random') {
                return new WalkingState(this.person);
            }

            return new QuickWalkingState(this.person);

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

        this.speed = 100;
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

    moveVector(input, delta) {
       let moveVector = new THREE.Vector3(0,0,0);

       this._filterDirections(input).forEach((dir) => moveVector.add(this.directions[dir]));


       moveVector.normalize();
       moveVector.multiplyScalar(this.speed*delta);

       return moveVector;
    }

    move(input, delta) {
        let moveVector = this.moveVector(input, delta);
        let canMove = this.canMove(moveVector);

        if (!canMove) {
            return;
        }
        this.person.stickman.move(moveVector);
        this.person.stickman.setOrientation(this._filterDirections(input));
    }

    update(input, delta) {

        if (!this._filterDirections(input).length) {
            return new IdleState(this.person);
        }

        if (input.includes('run')) {
            return new RunningState(this.person);
        }

        this.move(input, delta);

        return this;
    }

    enter() {
        this.person.stickman.walk();
    }

}

class QuickWalkingState extends WalkingState {

    constructor(person) {
        super(person);
        this.speed = 200;
        this.enter();
    }

    enter() {
        this.person.stickman.quickWalk();
    }

}


class RunningState extends WalkingState {

    constructor(person) {
        super(person);
        this.speed = 400;
        this.enter();
    }

    update(input, delta) {
        if (!this._filterDirections(input).length) {
            return new IdleState(this.person);
        }

        if (!input.includes('run')) {
            if (this.person.type === 'random') {
                return new WalkingState(this.person);
            }

            return new QuickWalkingState(this.person);
        }

        this.move(input, delta);

        return this;
    }

    enter() {
        this.person.stickman.run();
    }

}


export {IdleState, RunningState, WalkingState};