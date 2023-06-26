import {Dice} from "../../tables/Dice";
import type {Galaxy} from "../galaxy/Galaxy";
import {SolarSystem} from "./SolarSystem";
import {SolarSystemNameTable} from "../../tables/solarSystem/SolarSystemNameTable";
import {SolarSystemStages, SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";
import {PlanetCreator} from "../celestialBody/PlanetCreator";
import {Save} from "../../persistence/Saver";
import type {Star} from "../celestialBody/Star";
import type {Planet} from "../celestialBody/Planet";
import {StarCreator} from "../celestialBody/StarCreator";

export class SolarSystemCreator{

    static addTo(galaxy: Galaxy, dice?: Dice, isEarthlike?: boolean): SolarSystem{
        if(!dice){
            dice = new Dice();
        }

        let solarSystem = new SolarSystem();

        solarSystem.name = new SolarSystemNameTable().roll(dice).string;

        solarSystem.stars = [];
        let numberOfStars = 0;
        if(isEarthlike){
            this.setStage(solarSystem, dice, "stable phase");
            numberOfStars = 1;
        }else{
            this.setStage(solarSystem, dice);
            numberOfStars = this.getNumberOfStars(dice);
        }


        for(let i = 0; i < numberOfStars; i++){
            let star = StarCreator.addTo(solarSystem, dice);
            solarSystem.stars.push(star);
        }

        let { start, end } = this.computeHabitableZone(dice);

        if(solarSystem.habitableZoneStart == 0 || start < solarSystem.habitableZoneStart){
            solarSystem.habitableZoneStart = start;
        }

        if(solarSystem.habitableZoneEnd == 0 || end > solarSystem.habitableZoneEnd){
            solarSystem.habitableZoneEnd = end;
        }


        solarSystem.isSelected = false;
        solarSystem.positionX = dice.rollInterval(20,330);
        solarSystem.positionY = dice.rollInterval(20,330);

        solarSystem.planets = [];
        let numberOfPlanets = this.getNumberOfPlanets(dice, solarSystem.stars);
        for(let i = 0; i < numberOfPlanets; i++){
            PlanetCreator.addTo(solarSystem, dice);
        }
        if(isEarthlike){
            solarSystem.habitableZoneStart  = 3;
            solarSystem.habitableZoneEnd  = 5;

            let distance = dice.rollInterval(solarSystem.habitableZoneStart, solarSystem.habitableZoneEnd);
            let planetsInsideTheZone =  solarSystem.planets.filter(planet => { return this.isInsideHabitualZone(planet, solarSystem)});
            if(planetsInsideTheZone.length === 0){
                let planet = PlanetCreator.createEarthlike(dice, distance);
                solarSystem.planets.push(planet);

            }else{
                let planet = planetsInsideTheZone[0];
                let planetIndex = solarSystem.planets.indexOf(planet);
                solarSystem.planets[planetIndex] = PlanetCreator.createEarthlike(dice, distance);
                //change the distance of the neighbor planets if to close
                if(planetIndex > 0
                    && solarSystem.planets[planetIndex - 1].distanceFromStar > distance - 0.5){

                    solarSystem.planets[planetIndex - 1].distanceFromStar = distance - 0.5;
                }

                if(planetIndex <= solarSystem.planets.length - 2
                    && solarSystem.planets[planetIndex + 1].distanceFromStar < distance - 0.5){

                    solarSystem.planets[planetIndex + 1].distanceFromStar = distance + 0.5;
                }
            }
            for(let i = 0; i < solarSystem.planets.length; i++){
                let planet = solarSystem.planets[i];
                this.isInsideHabitualZone(planet, solarSystem);
            }
        }

        galaxy.solarSystems.push(solarSystem);
        Save().then(r => {console.log("saved: "); console.log(r)});
        return solarSystem;
    }

    private static setStage(solarSystem: SolarSystem, dice: Dice, stage?: string) {
        if (!stage) {
            solarSystem.stage = new SolarSystemStageTable().roll(dice).string;
        }else{
            solarSystem.stage = stage;
        }

        let stageObject = SolarSystemStages.find(stage => stage.name === solarSystem.stage);
        if (!stageObject) {
            throw new Error("stage not found");
        }
        solarSystem.stageDescription = stageObject.description;
        solarSystem.age = this.getYearInBillionsFrom(stageObject, dice);
    }

    private static isInsideHabitualZone(planet: Planet, solarSystem: SolarSystem) {
        if (planet.distanceFromStar >= solarSystem.habitableZoneStart && planet.distanceFromStar <= solarSystem.habitableZoneEnd) {
            return true;
        }

        return false;
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


    static addWithEarthlike(galaxy: Galaxy, dice?: Dice) {
        if(!dice){
            dice = new Dice();
        }

        let solarSystem = this.addTo(galaxy, dice, true);
        let earthLikePlanet = solarSystem.planets.find(planet => planet.type === "earthlike");
        if(!earthLikePlanet){
            throw new Error("earthlike planet not found");
        }
        return earthLikePlanet;
    }
}