import {Dice} from "../../tables/Dice";
import {Planet} from "./Planet";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {PlanetTypeTable} from "../../tables/planet/PlanetTypeTable";
import {PlanetNameGenerator} from "./PlanetNameGenerator";
import {Save} from "../../persistence/Saver";
import {SizeTable} from "../../tables/other/SizeTable";
import {PlanetAtmosphereTable} from "../../tables/planet/PlanetAtmosphereTable";
import {PlanetWeatherTable} from "../../tables/planet/PlanetWeatherTable";

export const PlanetBaseColors = {
    desert: { r: 255, g: 220, b: 0 },
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
        planet.size = this.getSize(dice, planet.type);
        planet.atmosphere = new PlanetAtmosphereTable().roll(dice).string;
        planet.weather = this.getWeather(dice, planet.size, planet.atmosphere);

        planet.seed = dice.rollRandom();
        planet.resolution = 64;
        planet.brightness = 0.5;
        planet.noiseScale = 2.0;
        planet.color = this.generateColorVariant(PlanetBaseColors[planet.type]);
        planet.atmosphereColor = this.getAtmosphereColor(planet.atmosphere, planet.weather);
        solarSystem.planets.push(planet);
        Save();
        return planet;
    }

    private static getWeather(dice: Dice, size: string, atmosphere: string) {

        if(size === "tiny" || atmosphere === "none"){
            return "none";
        }
        if(size === "small" && atmosphere === "thin"){
            return "none";
        }

        return new PlanetWeatherTable().roll(dice).string;
    }

    private static getSize(dice: Dice, type: string) {
        if (type === "gasgiant") {
            return "gigantic";
        }
        return new SizeTable().roll(dice).string;
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

    private static getAtmosphereColor(atmosphere: string, weather: string) {
        if(atmosphere === "nitrogen-oxygen") {
            switch (weather) {
                case "foggy":
                    return [{ r: 255, g: 255, b: 255 }, 0.9]; // Almost fully opaque white
                case "stormy":
                    return [{ r: 255, g: 255, b: 255 }, 1.0]; // Fully opaque white
                default:
                    break;
            }
        }

            switch (atmosphere) {
                case "none":
                    return [{ r: 0, g: 0, b: 0 }, 0];
                case "nitrogen-oxygen":
                    return [{ r: 135, g: 206, b: 235 }, 0.2];
                case "carbon-dioxide":
                    return [{ r: 105, g: 105, b: 105 }, 0.5];
                case "hydrogen-helium":
                    return [{ r: 240, g: 230, b: 140 }, 0.5];
                case "methane":
                    return [{ r: 255, g: 140, b: 0 }, 0.5];
                default:
                    return [{ r: 255, g: 255, b: 255 }, 0.5];
            }
    }
}