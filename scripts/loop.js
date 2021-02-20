import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
import GameState from "./game_state.js"

import {CAMERA_INITIAL_POSITION} from "./world.js";

const clock = new THREE.Clock();


class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.gameState = new GameState();
    }

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = clock.getDelta();

        for (const object of this.gameState.updatables()) {
            object.tick(delta);
        }

        let medic = this.gameState.medic;
        this.camera.position.copy(CAMERA_INITIAL_POSITION)
        this.camera.position.add(medic.stickman.position);

    }
}


export { Loop };
export default Loop;