import {Dice} from "../../tables/Dice";
import {Planet} from "./Planet";
import type {SolarSystem} from "../solarSystem/SolarSystem";
import {PlanetTypeTable} from "../../tables/planet/PlanetTypeTable";
import {PlanetNameGenerator} from "./PlanetNameGenerator";
import {Save} from "../../persistence/Saver";
import {SizeTable} from "../../tables/other/SizeTable";
import {PlanetAtmosphereTable} from "../../tables/planet/PlanetAtmosphereTable";
import {PlanetWeatherTable} from "../../tables/planet/PlanetWeatherTable";
import {Ring} from "./Ring";
import {MoonCreator} from "./moon/MoonCreator";
import {PlanetTypeLivableTable} from "../../tables/planet/PlanetTypeLivableTable";
import {PlanetTypeNonLivableTable} from "../../tables/planet/PlanetTypeNonLivableTable";

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
    lethalice: { r: 187, g: 240, b: 255 },
    lethalrocky: { r: 128, g: 128, b: 128 },
};

export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a ?? 1;
    }
}

export const PlanetRingColors = [
    { none: new Color(0, 0, 0, 0) },            // Transparent color, for no ring
    { ice: new Color(240, 248, 255, 0.5) },     // Ice-white color, like Saturn's rings
    { grey: new Color(169, 169, 169, 0.5) },    // Grey color, for rock-dominant rings like Uranus
    { iron: new Color(210, 105, 30, 0.4) },     // Slightly reddish/brownish, indicating presence of iron
    { dusty: new Color(218, 165, 32, 0.4) },    // Slightly yellowish, indicating dusty rings
    { organic: new Color(160, 82, 45, 0.4) },   // Dark brown color, indicating presence of organic compounds
    { tholins: new Color(204, 119, 34, 0.5) }   // Reddish-brown color, for rings containing tholins (organic molecules)
];

const PlanetRingColorNames = PlanetRingColors.map(item => Object.keys(item)[0]);
const PlanetRingColorValues = PlanetRingColors.map(item => Object.values(item)[0]);

export class PlanetCreator {
    static create(dice: Dice, inHabitableZone: boolean, distanceFromStar: number): Planet {

        let planet = new Planet();
        planet.distanceFromStar = distanceFromStar;

        let randomNumber = dice.rollRandom();
        if (inHabitableZone && randomNumber < 0.8) {
           planet.type = new PlanetTypeLivableTable().roll(dice).string;
        }else if(inHabitableZone){
            planet.type = new PlanetTypeTable().roll(dice).string;
        }else{
            planet.type = new PlanetTypeNonLivableTable().roll(dice).string;
        }

        let planetName = PlanetNameGenerator.generate(dice);
        planet.name = planetName.getName();
        planet.nameTranslation = planetName.getTransliteration();
        planet.nameMeaning = planetName.getMeaning();
        planet.size = this.getSize(dice, planet.type);
        planet.atmosphere = new PlanetAtmosphereTable().roll(dice).string;
        planet.weather = this.getWeather(dice, planet.size, planet.atmosphere);
        planet.obliquity = this.getObliquity(dice);
        planet.rings = this.getRings(dice);
        if(planet.rings.length > 0){
            planet.ringColorName = planet.rings[0].name;
        }
        planet.seed = dice.rollRandom();
        planet.resolution = 64;
        planet.brightness = 0.5;
        planet.noiseScale = 2.0;
        planet.color = this.generateColorVariant(PlanetBaseColors[planet.type]);
        planet.atmosphereColor = this.getAtmosphereColor(planet.atmosphere, planet.weather);
        planet.moons = this.getMoons(dice);
        return planet;
    }
    static addTo(solarSystem: SolarSystem, dice?: Dice): Planet {
        if (!dice) {
            dice = new Dice();
        }
        let distanceFromStar = solarSystem.lastDistanceFromStar + dice.rollInterval(0.3, 0.7);
        solarSystem.lastDistanceFromStar = distanceFromStar;  // Save the last distance for the next planet

        let inHabitableZone = distanceFromStar >= solarSystem.habitableZoneStart &&
            distanceFromStar <= solarSystem.habitableZoneEnd;

        let planet = this.create(dice, inHabitableZone, distanceFromStar);

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
        function randomVariation(value: number) {
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
                    return [{ r: 70, g: 130, b: 180 }, 0.05];
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

    private static getObliquity(dice: Dice) {
        let hasNormalObliquity = dice.rollRandom() > 0.1;
        if (hasNormalObliquity) {
            return dice.rollRandom() * 30;
        }

        return dice.rollInterval(31,360);
    }

    private static getRingColor(dice: Dice) {
        let ringColorIndex = dice.rollInterval(1,PlanetRingColors.length-1);
        return PlanetRingColorValues[ringColorIndex];
    }
    private static getNumberOfRings(dice: Dice) {
        let randomNumber = dice.roll(20);
        let numberOfRings = 0;
        if(randomNumber <= 2){
            numberOfRings = 3;
        } else if(randomNumber <= 4){
            numberOfRings = 2;
        } else if(randomNumber <= 8){
            numberOfRings = 1;
        }
        return numberOfRings;
    }

    private static getRings(dice: Dice) {
        let numberOfRings = this.getNumberOfRings(dice);
        if (numberOfRings > 0) {
            let rings = [];
            let color =  this.getRingColor(dice);
            for (let i = 0; i < numberOfRings; i++) {

                let name = this.getRingNameOf(color);
                let innerRadius =  dice.rollInterval(0.1, 0.3);
                let outerRadius =  dice.rollInterval(0.7, 1.0);
                let ring = new Ring(name, color, innerRadius, outerRadius);
                rings.push(ring);
            }
            return rings;
        }
        return [];
    }

    private static getRingNameOf(color: Color) {
        let index = PlanetRingColorValues.indexOf(color);
        return PlanetRingColorNames[index];
    }

    private static getMoons(dice: Dice) {
        let numberOfMoons = dice.rollInterval(0, 3);
        if (numberOfMoons > 0) {
            let moons = [];
            for (let i = 0; i < numberOfMoons; i++) {
                let moon = MoonCreator.create(dice);
                moons.push(moon);
            }
            return moons;
        }
        return [];
    }
}