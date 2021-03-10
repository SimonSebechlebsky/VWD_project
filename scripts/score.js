

class Score {

    constructor(illPeopleCount, healthyPeopleCount) {
        this.illPeopleCount = illPeopleCount;
        this.vaccinablePeopleCount = healthyPeopleCount;
        this.vaccinatedPeopleCount = 0;
        this.initialize();
    }

    initialize() {
        document.getElementById("pre_score_ill").innerHTML = " Ill: " + this.illPeopleCount;
        document.getElementById("pre_score_vaccinable").innerHTML = " Healthy: " + this.vaccinablePeopleCount;
        document.getElementById("pre_score_vaccinated").innerHTML = " Vaccinated: " + this.vaccinatedPeopleCount;
    }

    updateIllPeopleCount() {
        this.illPeopleCount++;
        document.getElementById("pre_score_ill").innerHTML = " Ill: " + this.illPeopleCount;
    }

    updateVaccinablePeopleCount() {
        this.vaccinablePeopleCount--;
        document.getElementById("pre_score_vaccinable").innerHTML = " Healthy: " + this.vaccinablePeopleCount;
    }

    updateVaccinatedPeopleCount() {
        this.vaccinatedPeopleCount++;
        document.getElementById("pre_score_vaccinated").innerHTML = " Vaccinated: " + this.vaccinatedPeopleCount;
    }

}

export {Score};