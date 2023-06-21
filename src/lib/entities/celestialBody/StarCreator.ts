import {SolarSystem} from "../solarSystem/SolarSystem";
import {Star} from "./Star";
import {Dice} from "../../tables/Dice";
import {SizeTable} from "../../tables/other/SizeTable";
import {SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";

export class StarCreator{

    static addTo(solarSystem: SolarSystem, dice?: Dice, stage?: string) {
        if(!dice){
            dice = new Dice();
        }
        let stars = [];
        let star = new Star();
        star.size = new SizeTable().roll(dice).string;
        if(stage){
            star.stage = stage;
        }else{
            star.stage = new SolarSystemStageTable().roll(dice).string;
        }

        star.mass = this.getMassFrom(star.size, star.stage, dice);
        star.luminosity = this.getLuminosityFrom(star.mass, star.stage);
        star.surfaceTemperature = this.generateSurfaceTemperature(star.mass, star.stage);
        star.color = this.getStarColor(star.surfaceTemperature, star.stage);

        stars.push(star);
        solarSystem.stars = stars;

        return stars;
    }
        static getLuminosityFrom(mass, stage) {
            let luminosity =  Math.pow(mass, 3.5);

             if (stage === 'red giant') {
                // Red giants are much brighter than main sequence stars
                // Here we use a very rough approximation
                luminosity = 1000 * Math.pow(mass, 3.5);
            } else if (stage === 'white dwarf' || stage === 'black dwarf') {
                // White dwarfs and black dwarfs are much fainter than main sequence stars
                // Again, this is a very rough approximation
                luminosity = 0.01 * Math.pow(mass, 3.5);
            }

            return luminosity;
        }

    private static getMassFrom(size: string, stage: string, dice: Dice) {

            // Assign base masses to each size category
            let baseMasses = {
                "tiny": 0.1,
                "small": 0.5,
                "medium": 1,
                "large": 5,
                "gigantic": 20,
            };

            // Ensure the provided size is valid
            if (!baseMasses.hasOwnProperty(size)) {
                throw new Error(`Invalid size: ${size}`);
            }

            // Start with the base mass for the provided size
            let mass = baseMasses[size];

            if (stage === 'white dwarf' || stage === 'black dwarf') {
                // White dwarfs and black dwarfs lose a significant fraction of their mass
                mass *= 0.5;
            }

            let massVariation = 0.2;
            let randomFactor = 1 + (dice.rollRandom() * 2 - 1) * massVariation;
            mass *= randomFactor;

            return mass;


    }

    static generateSurfaceTemperature(mass, stage) {
        let temperature;

        switch (stage) {
            case "molecular cloud":
                temperature = 10; // arbitrary value for molecular cloud stage
                break;
            case "protostar":
                temperature = 1000 * Math.sqrt(mass); // arbitrary relation for protostar stage
                break;
            case "planet formation":
                temperature = 1000 + mass * 100; // arbitrary relation for planet formation stage
                break;
            case "stable phase":
                temperature = 5000 * mass; // arbitrary relation for stable phase/main sequence star
                break;
            case "red giant":
                temperature = 3000 * Math.pow(mass, 1 / 3); // arbitrary relation for red giant stage
                break;
            case "white dwarf":
                temperature = 10000 / Math.sqrt(mass); // arbitrary relation for white dwarf stage
                break;
            case "black dwarf":
                temperature = 2000; // arbitrary value for black dwarf stage
                break;
            default:
                throw new Error(`Invalid stage: ${stage}`);
                break;
        }

        return temperature;
    }

    static getStarColor(surfaceTemperature, stage) {
        let r, g, b;

        switch (stage) {
            case "molecular cloud":
                r = 0;
                g = 0;
                b = 255;
                break;
            case "protostar":
                r = 255;
                g = 165;
                b = 0;
                break;
            case "planet formation":
                r = 255;
                g = 255;
                b = 255;
                break;
            case "stable phase":
                if (surfaceTemperature >= 30000) {
                    r = 255;
                    g = 255;
                    b = 255;
                } else {
                    let temperaturePercent = (surfaceTemperature - 1000) / (30000 - 1000);
                    r = Math.round(temperaturePercent * 255);
                    g = Math.round(temperaturePercent * 255);
                    b = 255;
                }
                break;
            case "red giant":
                r = 255;
                g = 69;
                b = 0;
                break;
            case "white dwarf":
                r = 255;
                g = 255;
                b = 255;
                break;
            case "black dwarf":
                r = 0;
                g = 0;
                b = 0;
                break;
            default:
                r = 0;
                g = 0;
                b = 0;
                break;
        }

        return { r, g, b };
    }

}