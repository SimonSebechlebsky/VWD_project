import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/controls/OrbitControls.js";

import gsap from 'https://cdn.skypack.dev/gsap@3.5.1';

import MedicPerson from './person/medic_person.js';
import RandomPerson from "./person/random_person.js";
import KeyboardInputHandler from './keyboard_input_handler.js'
import Loop from './loop.js';
//
let loop;
let scene;
let camera;
let renderer;

const CAMERA_INITIAL_POSITION = new THREE.Vector3(-330,660,-330);


class World {
    constructor() {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        document.body.appendChild( renderer.domElement );
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    initialize() {


        const light = new THREE.PointLight( 0xffffff, 0.7, 1000 );
        light.position.set( -300, 300, 300 );
        light.castShadow = true;
        light.shadow.camera.near = 5;
        light.shadow.camera.far = 60;
        light.shadow.bias = - 0.15;
        // light.color.setHex( 0x00ffff );

        scene.add( light );
        const axesHelper = new THREE.AxesHelper( 500 );
        scene.add( axesHelper );

        const backLight = new THREE.PointLight( 0xffffff, 1, 90 );
        backLight.position.set( 300, 300, 300 );
        scene.add( backLight );

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
        scene.add( ambientLight );

        const geometry = new THREE.PlaneBufferGeometry( 1300, 1300, 16 );
        const material = new THREE.MeshPhongMaterial( {color: 0x808080, side: THREE.DoubleSide, shininess: 10 } );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI / 2, 0, 0);
        scene.add( plane );

    }
}

function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('skyblue')

    return scene;
}

function createCamera() {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 3000 );
    camera.position.copy(CAMERA_INITIAL_POSITION);
    camera.lookAt(new THREE.Vector3(0,0,0));

    return camera;
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );


    return renderer;
}


export { World, scene, CAMERA_INITIAL_POSITION };
export default World;
