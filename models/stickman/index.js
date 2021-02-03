import { Group } from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/loaders/GLTFLoader.js";


class Stickman {
    constructor(position, color) {
        this.stickman = new Group()
        let gltfLoader = new GLTFLoader();
        gltfLoader.load("./models/stickman/scene.gltf", (object) => {
            // gltf loads an entire scene. You could use the scene directly or pull the objects out of the scene like below:
            let obj = object.scene.children[0];

            // obj.rotation.set(0, Math.PI / 1.8, 0);
            obj.scale.set(100, 100, 100);

            obj.children[0].children[0].children[0].children[0]
                .children[1].children[0].children[2].material.color.setHex(color)
            // obj.geometry.center();
            this.stickman.add(obj);
            this.stickman.position.set(...position)
        });
    }

    getSceneObj() {
        return this.stickman
    }

}


export { Stickman };
export default Stickman;