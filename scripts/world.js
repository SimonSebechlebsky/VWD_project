import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import GameState from "./game_state.js";
import Loop from './loop.js';

let loop;
let scene;
let camera;
let renderer;
let light;
let gameState;

const CAMERA_INITIAL_POSITION = new THREE.Vector3(-330,660,-330);
const WORLD_SIZE = 1300;


class World {
    constructor() {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        light = createLight();
        gameState = new GameState();
        loop = new Loop(camera, scene, renderer, light, gameState);
        document.body.appendChild( renderer.domElement );
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    initialize() {
        const geometry = new THREE.PlaneBufferGeometry( WORLD_SIZE, WORLD_SIZE);
        const material = new THREE.MeshPhongMaterial( {color: 0x808080, side: THREE.DoubleSide, shininess: 10 } );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI / 2, 0, 0);
        plane.receiveShadow = true;
        scene.add( plane );
    }
}

function createLight() {
    light = new THREE.PointLight(0xffffff, 0.9, 1000);
    light.position.copy(new THREE.Vector3(0, 200, 0));
    light.castShadow = true;
    light.shadow.camera.near = 50;
    light.shadow.camera.far = 1000;
    light.shadow.bias = 0.00001;
    light.shadow.mapSize.width = 800;
    light.shadow.mapSize.height = 800;
    light.shadow.radius = 5;
    scene.add(light);

    const backLight = new THREE.PointLight(0xffffff, 1, 90);
    backLight.position.set( 300, 300, 300 );
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    return light;
}

function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('skyblue');

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    return renderer;
}


export { World, scene, CAMERA_INITIAL_POSITION, WORLD_SIZE, gameState };
export default World;
