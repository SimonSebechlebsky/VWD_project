import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";


class CountDown {

    constructor(scene, countDownCallback) {
        this.scene = scene;
        this.countDownCallback = countDownCallback
        const loader = new THREE.FontLoader();
        this.font = null;
        this.mesh = null;
        this.position = new THREE.Vector3(25,200,-25);
        this.rotation = new THREE.Vector3(0, THREE.Math.degToRad(180+45), 0);
        this.material = new THREE.MeshPhongMaterial( { color: 0xCC0000 } );

        loader.load( 'fonts/Monaco_Regular.json', (font) => {
            this.font = font;
        } );
    }

    _createMesh(text) {
        let textGeom = new THREE.TextGeometry( text, {
            font: this.font,
            size: 80,
            height: 5,
            // curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        } );
        let textMesh = new THREE.Mesh(textGeom, this.material);

        textMesh.position.copy(this.position);
        textMesh.rotation.setFromVector3(this.rotation);

        console.log(textMesh)
        return textMesh;
    }

    start(from=3) {
        this._displayNumber(3)
    }

    _displayNumber(number, previous=null) {
        setTimeout(() => {
            if (previous) {
                this.scene.remove(previous);
            }

            if (number === 0) {
                this.scene.remove(previous);
                this.countDownCallback();
                return;
            }

            let mesh = this._createMesh(number.toString())
            this.scene.add(mesh)

            this._displayNumber(number-1, mesh);

        }, 1000);
    }
}


export default CountDown;