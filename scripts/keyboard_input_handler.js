import {gameState} from './world.js'

class KeyboardInputHandler {
    constructor() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            run: false,
        };

        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    getInput() {
        if (gameState.levelState.paused) {
            return [];
        }

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
            case 38: // up
                this.keys.forward = true;
                break;
            case 65: // a
            case 37: //left
                this.keys.left = true;
                break;
            case 83: // s
            case 40: //down
                this.keys.backward = true;
                break;
            case 68: // d
            case 39: //right
                this.keys.right = true;
                break;
            case 32: // SPACE
                this.keys.space = true;
                break;
            case 16: // SHIFT
                this.keys.run = true;
                break;
        }
    }

    _onKeyUp(event) {
        switch(event.keyCode) {
            case 87: // w
            case 38: // up
                this.keys.forward = false;
                break;
            case 65: // a
            case 37: //left
                this.keys.left = false;
                break;
            case 83: // s
            case 40: //down
                this.keys.backward = false;
                break;
            case 68: // d
            case 39: //right
                this.keys.right = false;
                break;
            case 32: // SPACE
                this.keys.space = false;
                break;
            case 16: // SHIFT
                this.keys.run = false;
                break;
        }
    }
}
export default KeyboardInputHandler;