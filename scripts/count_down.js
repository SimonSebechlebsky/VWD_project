import * as THREE from "https://cdn.skypack.dev/three@v0.122.0/build/three.module.js";


class CountDown {

    constructor(scene, countDownCallback) {
        this.scene = scene;
        this.countDownCallback = countDownCallback;
        const loader = new THREE.FontLoader();
        this.font = null;
        this.position = new THREE.Vector3(25,200,-25);
        this.levelPosition = new THREE.Vector3(100,350,-100);
        this.rotation = new THREE.Vector3(0, THREE.Math.degToRad(180+45), 0);
        this.material = new THREE.MeshPhongMaterial( { color: 0xCC0000 } );

        loader.load('fonts/Monaco_Regular.json', (font) => {
            this.font = font;
        });
    }

    _createMesh(text, position, size=80) {
        let textGeom = new THREE.TextGeometry( text, {
            font: this.font,
            size: size,
            height: 5,
        } );
        let textMesh = new THREE.Mesh(textGeom, this.material);

        textMesh.position.copy(position);
        textMesh.rotation.setFromVector3(this.rotation);
        return textMesh;
    }

    start(levelNum, from=3) {
        let mesh = this._createMesh(from.toString(), this.position)
        this.scene.add(mesh)
        let levelMesh = this._createMesh(`Level ${levelNum}`, this.levelPosition,50);
        this.scene.add(levelMesh)
        this._displayNumber(from-1, levelMesh, mesh)
    }

    _displayNumber(number,levelMesh, previous=null) {
        setTimeout(() => {
            if (previous) {
                this.scene.remove(previous);
            }

            if (number === 0) {
                this.scene.remove(previous);
                this.scene.remove(levelMesh);
                this.countDownCallback();
                return;
            }

            let mesh = this._createMesh(number.toString(), this.position)
            this.scene.add(mesh)

            this._displayNumber(number-1,levelMesh, mesh);

        }, 1000);
    }
}


export default CountDown;