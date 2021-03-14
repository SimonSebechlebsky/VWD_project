import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";

import {WORLD_SIZE} from "./world.js";
import VirusModel from "../models/virus/virus_model.js";

import {scene} from './world.js'

class Virus {
    constructor(xPosition=WORLD_SIZE) {
        this.model = new VirusModel(scene, [xPosition,50,Math.random()*WORLD_SIZE-WORLD_SIZE/2]);
        this.speed = Math.random()*100 + 75;
        this.paused = true;
    }

    tick(delta) {
        this.model.move(this.moveVector(delta));
        this.model.rotate(this.rotateVector(delta));
    }


    moveVector(delta) {
        let moveVector = new THREE.Vector3(-1,0,0);
        moveVector.normalize();
        moveVector.multiplyScalar(this.speed*delta);

        return moveVector
    }

    rotateVector(delta) {
        return new THREE.Vector3(THREE.Math.degToRad(30)*delta,THREE.Math.degToRad(30)*delta,0);
    }

    destroy() {
        scene.remove(this.model.scene_obj);
    }

}

export default Virus;