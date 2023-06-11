import {Culture} from "./Culture";
import {CultureNameTable} from "../../tables/character/CultureNameTable";
import {Dice} from "../../tables/Dice";

export class CultureCreator{
    public static create(dice? :Dice){
        let culture = new Culture();
        culture.name = new CultureNameTable().roll(dice).getString();
        return culture;
    }
}