import MedicPerson from "./person/medic_person.js";
import RandomPerson from "./person/random_person.js";


class GameState {

    constructor() {
        this.medic = new MedicPerson();
        this.randomPeople = [];

        for (let i = 0; i < 10; i++) {
            this.randomPeople.push(new RandomPerson());
        }
    }


    updatables() {
        return [this.medic, ...this.randomPeople];
    }
}

export default GameState;