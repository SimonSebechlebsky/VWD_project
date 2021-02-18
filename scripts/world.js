import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.122.0/examples/jsm/controls/OrbitControls.js";

import gsap from 'https://cdn.skypack.dev/gsap@3.5.1';

import Stickman from '../models/stickman/index.js';
import Loop from './loop.js';
//
let loop;
let scene;
let camera;
let renderer;
let controls;



class World {
    constructor() {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        document.body.appendChild( renderer.domElement );

        controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 80;
        controls.enableDamping = true;

        window.addEventListener( 'resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );
    }


    render () {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
        controls.update();
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    initialize() {
        let stickman = new Stickman([0,0,0], 0xFFFFFF);
        let stickman1 = new Stickman([50,0,50], 0xFFFFFF);
        let stickman2 = new Stickman([-200,0,-200], 0x33BEFF);
        let stickman3 = new Stickman([0,0,300], 0xFFFFFF);
        let stickman4 = new Stickman([40,0,0], 0xff0000);



        scene.add(stickman.getSceneObj());
        scene.add(stickman1.getSceneObj());
        scene.add(stickman2.getSceneObj());
        scene.add(stickman3.getSceneObj());
        scene.add(stickman4.getSceneObj());

        loop.updatables.push(stickman);

        const light = new THREE.PointLight( 0xffffff, 0.7, 1000 );
        light.position.set( -300, 300, 300 );
        light.castShadow = true;
        light.shadow.camera.near = 5;
        light.shadow.camera.far = 60;
        light.shadow.bias = - 0.15;

        scene.add( light );

        const backLight = new THREE.PointLight( 0xffffff, 1, 90 );
        backLight.position.set( 300, 300, 300 );
        scene.add( backLight );

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
        scene.add( ambientLight );

        const geometry = new THREE.PlaneBufferGeometry( 1300, 1300, 16 );
        const material = new THREE.MeshPhongMaterial( {color: 808080, side: THREE.DoubleSide, shininess: 10 } );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI / 2, 0, 0);
        scene.add( plane );

    }
}

function createScene() {
    scene = new THREE.Scene();
    console.log("here");
    scene.background = new THREE.Color('skyblue')
    // scene.fog = new THREE.Fog( 0xffffff, 1000, 3000 );

    return scene;
}

function createCamera() {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 3000 );
    camera.position.set(400,400,400);
    camera.lookAt(new THREE.Vector3(0,1,0));

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.minDistance = 80;
    // controls.enableDamping = true;

    return camera;
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );


    return renderer;
}



// gsap.from(apple.position, {
//   y: 100,
//   duration: 2.5,
//   ease: "bounce.out"
// });




export { World };
export default World;
