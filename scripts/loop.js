import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
import GameState from "./game_state.js"

import {CAMERA_INITIAL_POSITION} from "./world.js";

const clock = new THREE.Clock();


class Loop {
    constructor(camera, scene, renderer, light, gameState, collisionDetection) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.light = light;
        this.gameState = gameState;
        this.collisionDetection = collisionDetection;
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
        this.collisionDetection.update();

        let medic = this.gameState.medic;
        this.camera.position.copy(CAMERA_INITIAL_POSITION)
        this.camera.position.add(medic.stickman.position);
        this.light.position.set(medic.stickman.position.x, 700, medic.stickman.position.z);

    }
}


export { Loop };
export default Loop;