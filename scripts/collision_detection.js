import {WORLD_SIZE} from "./world.js";


class CollisionDetection {

    constructor(levelState) {
        this.levelState = levelState;
        this.nearby = this.create();
    }

    create() {
        const binSize = 7;
        const nearby = new Nearby(WORLD_SIZE, 100, WORLD_SIZE, binSize);
        let vaccinablePeople = this.levelState.getVaccinablePeople();
        for (let person of vaccinablePeople.values()) {
            const box = nearby.createBox(person.stickman.position.x,
                person.stickman.position.y, person.stickman.position.z,
                44, 75, 44
            );
            person.nearbyObj = nearby.createObject(person.uuid, box);
            nearby.insert(person.nearbyObj);
        }
        return nearby;
    }

    update() {
        let vaccinablePeople = this.levelState.getVaccinablePeople();
        for (let person of vaccinablePeople.values()) {
            this.nearby.update(
                person.nearbyObj, person.stickman.position.x, person.stickman.position.y,
                person.stickman.position.z,
                44, 75, 44
            );
        }
    }

    findNearby(x, y, z) {
        let result;
        if (this.nearby) {
            result = this.nearby.query(x, y, z);
            for (let object of result.keys()) {
            }
        }
        return Array.from(result.keys());
    }

    remove(nearbyObj) {
        this.nearby.delete(nearbyObj);
    }

}

export {CollisionDetection};