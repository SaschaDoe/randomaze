import {Culture} from "./Culture";
import {CultureNameTable} from "../../tables/character/CultureNameTable";
import {Dice} from "../../tables/Dice";

export class CultureCreator{
    public static create(dice? :Dice){
        let name = new CultureNameTable().roll(dice).string
        let culture = new Culture(name);
        return culture;
    }
}