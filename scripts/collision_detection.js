import {WORLD_SIZE} from "./world.js";


class CollisionDetection {

    constructor(gameState) {
        this.people = gameState.randomPeople;
        this.nearby = this.create();
    }

    create() {
        const binSize = 7;
        const nearby = new Nearby(WORLD_SIZE, 100, WORLD_SIZE, binSize);

        for (let i=0; i < this.people.length; i++) {
            const box = nearby.createBox(this.people[i].stickman.position.x,
                this.people[i].stickman.position.y, this.people[i].stickman.position.z,
                44, 75, 44
            );
            this.people[i].nearbyObj = nearby.createObject(this.people[i].uuid, box);
            nearby.insert(this.people[i].nearbyObj);
        }

        return nearby;
    }

    update() {
        for (let i=0; i < this.people.length; i++) {
            this.nearby.update(
                this.people[i].nearbyObj,  this.people[i].stickman.position.x,  this.people[i].stickman.position.y,
                this.people[i].stickman.position.z,
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
        return Array.from(result.entries());
    }

    remove(nearbyObj) {
        this.nearby.delete(nearbyObj);
        console.log("deleting", nearbyObj.id);
    }

}

export {CollisionDetection};