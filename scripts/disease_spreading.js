
class DiseaseSpreading {

    constructor(levelState, collisionDetection) {
        this.levelState = levelState;
        this.collisionDetection = collisionDetection;
    }

    infect(illPeople) {
        for (let person of illPeople.values()) {
            let nearbyPeople = this.collisionDetection.findNearby(person.stickman.position.x,
                person.stickman.position.y, person.stickman.position.z);

            if (nearbyPeople[0]) {
                let nearbyPerson = this.levelState.randomPeople.get(nearbyPeople[0].id);
                nearbyPerson.beInfected(()=> {
                    this.collisionDetection.remove(nearbyPerson.nearbyObj);
                });
            }
        }
    }

    update() {
        let illPeople = this.levelState.getIllPeople();
        // let people = this.collisionDetection.getPeople();

        this.infect(illPeople);
    }



}

export {DiseaseSpreading};