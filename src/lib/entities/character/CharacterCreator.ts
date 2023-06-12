import {Dice} from "../../tables/Dice";
import {Character} from "./Character";
import {CultureCreator} from "./CultureCreator";
import {GenderTable} from "../../tables/character/GenderTable";

export class CharacterCreator{
    public static create(dice?: Dice){
        let character = new Character();
        character.culture = CultureCreator.create(dice);
        character.gender = new GenderTable().roll(dice).getString();
        return character;
    }
}