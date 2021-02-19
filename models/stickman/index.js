import { Group } from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";


class Stickman {
    constructor(scene, position, color, loadingCallback=null) {
        this.scene_obj = null;
        this.mixer = null;
        this.color = color;
        this.position = position;
        this.scene = scene;
        this.animations = {};
        this.loadingCallback = loadingCallback;
        this.loaded = false;
        let gltfLoader = new GLTFLoader();
        gltfLoader.load("./models/stickman/scene.gltf", (gltf) => this._loadGLTF(gltf));

    }

    setColor(color) {
        this.scene_obj.children[0].children[0].children[0].children[0].children[0]
            .children[1].children[0].children[2].material.color.setHex(color)
    }

    _loadGLTF(gltf) {
        this.scene_obj = gltf.scene;
        this.scene_obj.scale.set(100, 100, 100);
        this.setColor(this.color)
        this.scene.add(this.scene_obj);
        this.scene_obj.position.set(...this.position);

        this.mixer = new THREE.AnimationMixer(this.scene_obj);
        this._loadAnimations(gltf);

        this.loaded = true;

        if (this.loadingCallback) {
            this.loadingCallback(this)
        }
    }

    _loadAnimations(gltf) {
        let animations_names = {
            "Armature.001|Armature.001|mixamo.com|Layer0": "idle",
            "Armature.001|Armature.002|mixamo.com|Layer0": "run",
            "Armature.001|Sad.Idle.001" : "sad_idle"
        }

        gltf.animations.forEach((animation) => {
            let name = animations_names[animation.name];
            this.animations[name] = this.mixer.clipAction(animation) })
    }

    tick(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }

    startAnimations(animation_list) {
        if (!this.loaded) {
            return;
        }

        for (let anim_name in this.animations) {

            if (animation_list.includes(anim_name) && !this.animations[anim_name].isRunning()) {
                this.animations[anim_name].play()
            }
            else if (this.animations[anim_name].isRunning()) {
                this.animations[anim_name].stop()
            }
        }
    }

    sadIdle() {
        this.startAnimations(['sad_idle'])
    }

    quickWalk() {
        this.startAnimations(['idle', 'run'])
    }

    walk() {
        this.startAnimations(['idle', 'run', 'sad'])
    }

    run() {
        this.startAnimations([ 'run'])
    }

    idle() {
        this.startAnimations(['idle'])
    }

}


export { Stickman };
export default Stickman;