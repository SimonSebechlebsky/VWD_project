import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import gsap from 'https://cdn.skypack.dev/gsap@3.5.1';

import Stickman from '../models/stickman/index.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue')
// scene.fog = new THREE.Fog( 0xffffff, 1000, 3000 );

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

// gsap.from(apple.position, {
//   y: 100,
//   duration: 2.5,
//   ease: "bounce.out"
// });


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

export { scene };
export default scene;
