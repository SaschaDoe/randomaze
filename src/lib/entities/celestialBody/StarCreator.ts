import {SolarSystem} from "../solarSystem/SolarSystem";
import {Star} from "./Star";
import {Dice} from "../../tables/Dice";
import {SizeTable} from "../../tables/other/SizeTable";
import {SolarSystemStageTable} from "../../tables/solarSystem/SolarSystemStageTable";

export class StarCreator{

    static addTo(solarSystem: SolarSystem, dice?: Dice) {
        if(!dice){
            dice = new Dice();
        }
        let stars = [];
        let star = new Star();
        star.size = new SizeTable().roll(dice).string;
        star.stage = new SolarSystemStageTable().roll(dice).string;
        star.mass = this.getMassFrom(star.size, star.stage, dice);
        star.luminosity = this.getLuminosityFrom(star.mass, star.stage);

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
}