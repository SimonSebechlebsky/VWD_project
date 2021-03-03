import {WORLD_SIZE} from "./world.js";


class CollisionDetection {

    constructor(levelState) {
        this.people = levelState.randomPeople;
        this.nearby = this.create();
    }

    create() {
        const binSize = 7;
        const nearby = new Nearby(WORLD_SIZE, 100, WORLD_SIZE, binSize);

        for (let person of this.people.values()) {
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
        for (let person of this.people.values()) {
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
                console.log(object.id + " is found nearby ");
            }
        }
        return Array.from(result.keys());
    }

    remove(nearbyObj) {
        this.nearby.delete(nearbyObj);
        console.log("deleting", nearbyObj.id);
    }

}

export {CollisionDetection};