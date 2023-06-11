import {Culture} from "./Culture";
import {CultureNameTable} from "../../tables/character/CultureNameTable";

export class CultureCreator{
    public static create(dice){
        let culture = new Culture();
        culture.name = new CultureNameTable().roll(dice).getString();
        return culture;
    }
}