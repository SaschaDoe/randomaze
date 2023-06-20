import {Dice} from "../../tables/Dice";
import {Planet} from "./Planet";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {PlanetTypeTable} from "../../tables/planet/PlanetTypeTable";
import {PlanetNameGenerator} from "./PlanetNameGenerator";
import {Save} from "../../persistence/Saver";

export const PlanetBaseColors = {
    desert: { r: 210, g: 180, b: 140 },
    ice: { r: 187, g: 240, b: 255 },
    jungle: { r: 34, g: 139, b: 34 },
    earthlike: { r: 46, g: 139, b: 87 },
    gasgiant: { r: 255, g: 165, b: 0 },
    puffy: { r: 177, g: 23, b: 175 },
    lava: { r: 207, g: 16, b: 32 },
    ocean: { r: 0, g: 73, b: 255 },
    rocky: { r: 128, g: 128, b: 128 },
};
export class PlanetCreator {
    static addTo(solarSystem: SolarSystem, dice?: Dice): Planet {
        if (!dice) {
            dice = new Dice();
        }
        let planet = new Planet();
        planet.type = new PlanetTypeTable().roll(dice).string;
        let planetName = PlanetNameGenerator.generate(dice);
        planet.name = planetName.getName();
        planet.nameTranslation = planetName.getTransliteration();
        planet.nameMeaning = planetName.getMeaning();
        planet.seed = dice.rollRandom();
        planet.resolution = 64;
        planet.noiseScale = 2;
        planet.brightness = 0.5;
        planet.color = this.generateColorVariant(PlanetBaseColors[planet.type]); // Generate a color variant based on the planet type

        solarSystem.planets.push(planet);
        Save();
        return planet;
    }

    static generateColorVariant(baseColor, variability = 0.3) {
        function randomVariation(value) {
            const adjustmentFactor = 1.0 + (Math.random() * 2 - 1) * variability;
            return Math.max(0, Math.min(255, Math.round(value * adjustmentFactor)));
        }

        return {
            r: randomVariation(baseColor.r),
            g: randomVariation(baseColor.g),
            b: randomVariation(baseColor.b)
        };
    }
}