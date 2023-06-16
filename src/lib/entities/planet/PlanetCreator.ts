
import {Dice} from "../../tables/Dice";
import {Planet} from "./Planet";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {PlanetTypeTable} from "../../tables/planet/PlanetTypeTable";
import {PlanetNameGenerator} from "./PlanetNameGenerator";

export class PlanetCreator{
    static addTo(solarSystem: SolarSystem, dice?: Dice): Planet{
        let planet = new Planet();
        planet.type = new PlanetTypeTable().roll(dice).string;
        let planetName = PlanetNameGenerator.generate(dice);
        planet.name = planetName[0];
        planet.nameTranslation = planetName[1];
        planet.nameMeaning = planetName[2];

        solarSystem.planets.push(planet);
        return planet;
    }

}