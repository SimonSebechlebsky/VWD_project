import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
// import { Clock } from 'three';
import World from "./world.js";

const clock = new THREE.Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = clock.getDelta();

        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}


export { Loop };
export default Loop;