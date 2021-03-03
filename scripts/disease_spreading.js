import {gameState} from "./world.js";


class DiseaseSpreading {

    constructor(levelState, collisionDetection) {
        this.randomPeople = levelState.randomPeople;
        this.collisionDetection = collisionDetection;
    }

    infect(illPeople, healthyPeople) {
        for (let person of illPeople.values()) {
            let nearbyPeople = this.collisionDetection.findNearby(person.stickman.position.x,
                person.stickman.position.y, person.stickman.position.z);
            if (nearbyPeople[0]) {
                console.log(nearbyPeople[0].id)
                console.log(healthyPeople)
                console.log(illPeople)
                let nearbyPerson = healthyPeople.get(nearbyPeople[0].id);
                console.log(nearbyPerson)
                nearbyPerson.beInfected();
                gameState.collisionDetection.remove(nearbyPerson.nearbyObj);
            }
        }
    }

    update() {
        let illPeople = this.collisionDetection.getIllPeople();
        let healthyPeople = this.collisionDetection.getHealthyPeople();

        this.infect(illPeople, healthyPeople);
    }



}

export {DiseaseSpreading};