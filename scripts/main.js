import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";

import World from './world.js';

function main() {
  const world = new World();

  world.initialize();
  world.start();
}

main();

