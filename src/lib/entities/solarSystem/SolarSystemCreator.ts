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

        galaxy.solarSystems.push(solarSystem);
        return solarSystem;
    }

    private static getYearInBillionsFrom(stage, dice: Dice) {
        let minDuration = parseInt(stage.minDuration);
        let maxDuration = parseInt(stage.maxDuration);

        return dice.rollInterval(minDuration, maxDuration);
    }
}