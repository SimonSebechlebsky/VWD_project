import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/loaders/FBXLoader.js";

import loadingManager from "../../scripts/loading_manager.js";

let virusMesh = null;
const loader = new FBXLoader(loadingManager);
loader.load("./models/virus/virus.fbx", (obj) => {
    virusMesh = obj.children[0].children[0]
});


class VirusModel {
    constructor(scene, position) {
        this.scene = scene;
        this.scene_obj = virusMesh.clone();
        this.position = new THREE.Vector3(...position);
        this._init_mesh();
    }

    _init_mesh() {
        this.scene_obj.material.color.setRGB(1,0,0);
        this.scene_obj.material.emissive.setRGB(0.6,0,0);
        this.scene_obj.scale.set(0.8, 0.8, 0.8);

        this.scene_obj.position.copy(this.position);
        this.position = this.scene_obj.position; //create reference;
        this.scene.add(this.scene_obj);
    }

    move(vector) {
        this.position.add(vector)
    }

    rotate(vector) {
        let rotationVector = this.scene_obj.rotation.toVector3();
        rotationVector.add(vector);
        this.scene_obj.rotation.setFromVector3(rotationVector);

    }
}

export default VirusModel;