
import {Dice} from "../../tables/Dice";
import {Planet} from "./Planet";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {PlanetTypeTable} from "../../tables/planet/PlanetTypeTable";
import {PlanetNameGenerator} from "./PlanetNameGenerator";
import {Save} from "../../persistence/Saver";

export class PlanetCreator{
    static addTo(solarSystem: SolarSystem, dice?: Dice): Planet{
        let planet = new Planet();
        planet.type = new PlanetTypeTable().roll(dice).string;
        let planetName = PlanetNameGenerator.generate(dice);
        planet.name = planetName.getName();
        planet.nameTranslation = planetName.getTransliteration();
        planet.nameMeaning = planetName.getMeaning();

        solarSystem.planets.push(planet);
        Save();
        return planet;
    }

}