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
        return moon;
    }

}