import {Dice} from "../../tables/Dice";
import type {Galaxy} from "../galaxy/Galaxy";
import {SolarSystem} from "./SolarSystem";
import {SolarSystemNameTable} from "../../tables/solarSystem/SolarSystemNameTable";
import {SolarSystemStages, SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";
import {PlanetCreator} from "../celestialBody/PlanetCreator";
import {Save} from "../../persistence/Saver";
import {StarCreator} from "../celestialBody/StarCreator";
import type {Star} from "../celestialBody/Star";

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
            let star = StarCreator.addTo(solarSystem, dice);

            // Compute the habitable zone based on the star type or luminosity
            let { start, end } = this.computeHabitableZone(dice);
            if(solarSystem.habitableZoneStart == 0 || start < solarSystem.habitableZoneStart){
                solarSystem.habitableZoneStart = start;
            }

            if(solarSystem.habitableZoneEnd == 0 || end > solarSystem.habitableZoneEnd){
                solarSystem.habitableZoneEnd = end;
            }
        }

        let stageObject = SolarSystemStages.find(stage => stage.name === solarSystem.stage);
        if(!stageObject){
            throw new Error("stage not found");
        }
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

    private static computeHabitableZone(dice: Dice): {start: number, end: number} {
        let start = 0.5 + dice.roll(3);
        let end = start + dice.roll(3);

        return {start, end};
    }

    private static getYearInBillionsFrom(stage: any, dice: Dice) {
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

        let randomNumber = dice.roll(20);
        let numberOfStars = 1;

        if(randomNumber === 20){
            numberOfStars = 3;
        }else if(randomNumber >= 18){
            numberOfStars = 2;
        }
        return numberOfStars;
    }


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