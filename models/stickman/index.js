import { Group } from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import _ from 'https://cdn.skypack.dev/lodash';


class Stickman {
    constructor(scene, position, color, loadingCallback=null) {
        this.scene_obj = null;
        this.mixer = null;
        this.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
        this.position = new THREE.Vector3(...position);
        this.scene = scene;
        this.animations = {};
        this.loadingCallback = loadingCallback;
        this.loaded = false;
        let gltfLoader = new GLTFLoader();
        gltfLoader.load("./models/stickman/scene.gltf", (gltf) => this._loadGLTF(gltf));

    }

    setColor(color) {
        this.color.setRGB(color[0]/255, color[1]/255, color[2]/255);
    }

    move(vector) {
        if (!this.loaded) {
            return;
        }
        this.position.add(vector);
    }

    setOrientation(directions) {
        if (!this.loaded) {
            return;
        }

        let orientations = {
            forward: THREE.Math.degToRad(45),
            left: THREE.Math.degToRad(135),
            backward: THREE.Math.degToRad(225),
            right: THREE.Math.degToRad(315)

        }

        let dirCount = 0;
        let angle = 0.;
        directions.forEach((dir) => {
            angle += orientations[dir];
            dirCount++;
        })

        angle = angle/dirCount;

        if (_.isEqual(directions.sort(), ['forward', 'right'])) {
            angle += THREE.Math.degToRad(180);
        }
        this.scene_obj.rotation.y = angle;
}

    _loadGLTF(gltf) {
        this.scene_obj = gltf.scene;
        this.scene_obj.scale.set(100, 100, 100);

        let color = this.scene_obj.children[0].children[0].children[0].children[0].children[0]
            .children[1].children[0].children[2].material.color;
        color.copy(this.color);
        this.color = color;

        this.scene.add(this.scene_obj);
        this.scene_obj.position.copy(this.position);
        this.position = this.scene_obj.position; //create reference;

        this.mixer = new THREE.AnimationMixer(this.scene_obj);
        this._loadAnimations(gltf);



        this.loaded = true;

        if (this.loadingCallback) {
            this.loadingCallback(this);
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
            else if (!animation_list.includes(anim_name)) {
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