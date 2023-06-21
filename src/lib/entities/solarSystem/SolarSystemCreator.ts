import {Dice} from "../../tables/Dice";
import {Galaxy} from "../galaxy/Galaxy";
import {SolarSystem} from "./SolarSystem";
import {SolarSystemNameTable} from "../../tables/solarSystem/SolarSystemNameTable";
import {SolarSystemStages, SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";
import {PlanetCreator} from "../celestialBody/PlanetCreator";
import {Save} from "../../persistence/Saver";
import {StarCreator} from "../celestialBody/StarCreator";
import {Star} from "../celestialBody/Star";

export class SolarSystemCreator{

    static addTo(galaxy: Galaxy, dice?: Dice): SolarSystem{
        if(!dice){
            dice = new Dice();
        }

        let solarSystem = new SolarSystem();

        solarSystem.name = new SolarSystemNameTable().roll(dice).string;
        solarSystem.stage = new SolarSystemStageTable().roll(dice).string;
        solarSystem.stars = [];
        let numberOfStars = this.getNumberOfStars(dice);
        for(let i = 0; i < numberOfStars; i++){
            StarCreator.addTo(solarSystem, dice);
        }

        let stageObject = SolarSystemStages.find(stage => stage.name === solarSystem.stage);

        solarSystem.stageDescription = stageObject.description;
        solarSystem.age = this.getYearInBillionsFrom(stageObject, dice);
        solarSystem.isSelected = false;
        solarSystem.positionX = dice.rollInterval(20,330);
        solarSystem.positionY = dice.rollInterval(20,330);

        solarSystem.planets = [];
        let numberOfPlanets = this.getNumberOfPlanets(dice, solarSystem.stars);
        for(let i = 0; i < numberOfPlanets; i++){
            PlanetCreator.addTo(solarSystem, dice);
        }


        galaxy.solarSystems.push(solarSystem);
        Save().then(r => {console.log("saved: "); console.log(r)});
        return solarSystem;
    }

    private static getYearInBillionsFrom(stage, dice: Dice) {
        let minDuration = parseInt(stage.minDuration);
        let maxDuration = parseInt(stage.maxDuration);

        return dice.rollInterval(minDuration, maxDuration);
    }

    static create() {
        let solarSystem = new SolarSystem();
        solarSystem.name = "Solar System";
        solarSystem.stage = "mainSequence";
        solarSystem.stageDescription = "The main sequence is sometimes called the hydrogen-burning sequence, because it is the part of the stellar evolution where stars get the energy they need to shine from the nuclear fusion of hydrogen into helium.";
        solarSystem.age = 4.6;
        solarSystem.isSelected = false;
        solarSystem.positionX = 0;
        solarSystem.positionY = 0;
        solarSystem.planets = [];

        return solarSystem;
    }

    private static getNumberOfStars(dice: Dice) {
        let random = dice.rollRandom();
        let cumulativeProbability = 0;

        for (let i = 0; i < this.starSystemProbabilities.length; i++) {
            cumulativeProbability += this.starSystemProbabilities[i].probability;
            if (random <= cumulativeProbability) {
                return typeof this.starSystemProbabilities[i].stars === 'function'
                    ? (this.starSystemProbabilities[i].stars as () => number)()
                    : this.starSystemProbabilities[i].stars;
            }
        }
    }

    private static starSystemProbabilities = [
        { stars: 1, probability: 0.5},
        { stars: 2, probability: 0.35},
        {stars: 3, probability: 0.1},
        {stars: () => Math.floor(Math.random() * 4) + 4, probability: 0.05}
    ];


    private static getNumberOfPlanets(dice: Dice, stars: Star[]) {
        let numberOfPlanets = 0;

        for (let i = 0; i < stars.length; i++) {
            let randomFactor = Math.floor(dice.rollRandom() * 4)-2;
            let planetFactor = 8;

            if (stars[i].mass > 1) {
                // More massive stars can have more planets,
                planetFactor += 4;

            } else {
                // Lower mass stars might have fewer planets,
                planetFactor -= 2;
            }

            if(stars[i].stage === "redGiant" || stars[i].stage === "whiteDwarf" || stars[i].stage === "blackDwarf"){
                planetFactor -= 4;
            }

            numberOfPlanets += planetFactor + randomFactor;
        }

        return numberOfPlanets;
    }


}