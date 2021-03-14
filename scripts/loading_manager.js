import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";
import {gameState} from "./world.js";

const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = function ( ) {
    gameState.createLevelState();
    const button = document.getElementById("playButton");
    button.removeAttribute("disabled")
    button.innerHTML = 'Play';
};

export default loadingManager;