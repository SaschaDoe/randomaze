import {Moon} from "./Moon";
import {PlanetNameTable} from "../../../tables/planet/name/PlanetNameTable";
import {Dice} from "../../../tables/Dice";
import type {Planet} from "../Planet";
import {PlanetNameGenerator} from "../PlanetNameGenerator";
import {SizeTable} from "../../../tables/other/SizeTable";

export class MoonCreator{

    static create(dice?: Dice) : Moon{
        if(!dice) {
            dice = new Dice();
        }

        let moon = new Moon();
        let planetName = PlanetNameGenerator.generate(dice);
        moon.name = planetName.getName();
        moon.nameTranslation = planetName.getTransliteration();
        moon.nameMeaning = planetName.getMeaning();
        moon.size = new SizeTable().roll(dice).string;
        moon.distance = this.getDistance(dice, moon.size);
        return moon;
    }

    private static getDistance(dice: Dice, size: string) {
        let baseDistance = 200;
        if(size === "small"){
            baseDistance = 300;
        }
        if(size === "medium"){
            baseDistance = 400;
        }
        if(size === "large"){
            baseDistance = 700;
        }
        if(size === "gigantic"){
            baseDistance = 1000;
        }
        return baseDistance * dice.roll(2);
    }
}