import {Dice} from "../../tables/Dice";
import {Galaxy} from "../galaxy/Galaxy";
import {SolarSystem} from "./SolarSystem";
import {SolarSystemNameTable} from "../../tables/solarSystem/SolarSystemNameTable";

export class SolarSystemCreator{

    static addTo(galaxy: Galaxy, dice?: Dice): SolarSystem{
        let solarSystem = new SolarSystem();

        solarSystem.name = new SolarSystemNameTable().roll(dice).string;

        galaxy.solarSystems.push(solarSystem);
        return solarSystem;
    }

}