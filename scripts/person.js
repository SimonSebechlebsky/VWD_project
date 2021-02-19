import Stickman from '../models/stickman/index.js';
import {scene} from './world.js'


class KeyboardInputHandler{
    constructor() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };

        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    getInput() {
        let pressedKeys = [];

        for (const key in this.keys) {
            if (this.keys[key]) {
                pressedKeys.push(key);
            }
        }

        return pressedKeys;
    }

    // these 2 functions copied from https://github.com/simondevyoutube/ThreeJS_Tutorial_CharacterController/blob/main/main.js
    _onKeyDown(event) {
        switch (event.keyCode) {
            case 87: // w
                this.keys.forward = true;
                break;
            case 65: // a
                this.keys.left = true;
                break;
            case 83: // s
                this.keys.backward = true;
                break;
            case 68: // d
                this.keys.right = true;
                break;
            case 32: // SPACE
                this.keys.space = true;
                break;
            case 16: // SHIFT
                this.keys.shift = true;
                break;
        }
    }

    _onKeyUp(event) {
        switch(event.keyCode) {
            case 87: // w
                this.keys.forward = false;
                break;
            case 65: // a
                this.keys.left = false;
                break;
            case 83: // s
                this.keys.backward = false;
                break;
            case 68: // d
                this.keys.right = false;
                break;
            case 32: // SPACE
                this.keys.space = false;
                break;
            case 16: // SHIFT
                this.keys.shift = false;
                break;
        }
    }
}

class Person {

    constructor(inputHandler) {
        this.stickman = this._createStickman();
        this.speed = 0;
        this.direction = [0,0,0];
        this.moveState = new IdleState(this);

        this.inputHandler = inputHandler;
    }

    _createStickman() {
        return new Stickman(scene, [0,0,0], 0xFFFFFF);
    }

    tick(delta) {

        let prevMoveState = this.moveState;
        // this.moveState = this.moveState.update(this.inputHandler.getInput());
        if (prevMoveState.name() !== this.moveState.name()) {
            this.moveState.enter();
        }
        this.stickman.tick(delta);

        this.checkMoveState();
    }


    checkMoveState() {

    }


}



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
        return 'idle';
    }
}

class RunningState extends State {

}


class WalkingState extends State  {

}

export {Person, KeyboardInputHandler};
export default Person;