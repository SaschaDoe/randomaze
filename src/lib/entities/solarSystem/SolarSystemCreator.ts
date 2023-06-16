import {Dice} from "../../tables/Dice";
import {Galaxy} from "../galaxy/Galaxy";
import {SolarSystem} from "./SolarSystem";
import {SolarSystemNameTable} from "../../tables/solarSystem/SolarSystemNameTable";
import {SizeTable} from "../../tables/other/SizeTable";
import {SolarSystemStages, SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";

export class SolarSystemCreator{

    static addTo(galaxy: Galaxy, dice?: Dice): SolarSystem{
        if(!dice){
            dice = new Dice();
        }

        let solarSystem = new SolarSystem();

        solarSystem.name = new SolarSystemNameTable().roll(dice).string;
        solarSystem.size = new SizeTable().roll(dice).string;
        solarSystem.stage = new SolarSystemStageTable().roll(dice).string;
        let stageObject = SolarSystemStages.find(stage => stage.name === solarSystem.stage);

        solarSystem.stageDescription = stageObject.description;
        solarSystem.age = this.getYearInBillionsFrom(stageObject, dice);
        solarSystem.isSelected = false;
        solarSystem.positionX = dice.rollInterval(20,330);
        solarSystem.positionY = dice.rollInterval(20,330);
        solarSystem.planets = [];

        galaxy.solarSystems.push(solarSystem);
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
        solarSystem.size = "medium";
        solarSystem.stage = "mainSequence";
        solarSystem.stageDescription = "The main sequence is sometimes called the hydrogen-burning sequence, because it is the part of the stellar evolution where stars get the energy they need to shine from the nuclear fusion of hydrogen into helium.";
        solarSystem.age = 4.6;
        solarSystem.isSelected = false;
        solarSystem.positionX = 0;
        solarSystem.positionY = 0;
        solarSystem.planets = [];

        return solarSystem;
    }
}