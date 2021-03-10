
class DiseaseSpreading {

    constructor(levelState, collisionDetection) {
        this.levelState = levelState;
        this.collisionDetection = collisionDetection;
    }

    infectAtPosition(x, y, z) {

        let nearbyPeople = this.collisionDetection.findNearby(x, y, z);

        if (nearbyPeople[0]) {
            let nearbyPerson = this.levelState.randomPeople.get(nearbyPeople[0].id);
            nearbyPerson.beInfected(()=> {
                this.collisionDetection.remove(nearbyPerson.nearbyObj);
                this.levelState.score.updateIllPeopleCount();
                this.levelState.score.updateVaccinablePeopleCount();
            });
        }
    }

    update() {
        let illPeople = this.levelState.getIllPeople();
        for (let person of illPeople.values()) {
            this.infectAtPosition(person.stickman.position.x,
                person.stickman.position.y, person.stickman.position.z);
        }

        for (let virus of this.levelState.viruses) {
            this.infectAtPosition(virus.model.position.x, virus.model.position.y,
                virus.model.position.z);
        }
    }



}

export {DiseaseSpreading};