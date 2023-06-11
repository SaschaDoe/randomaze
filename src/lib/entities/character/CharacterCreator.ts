import {Dice} from "../../tables/Dice";
import {Character} from "./Character";
import {CultureCreator} from "./CultureCreator";

export class CharacterCreator{
    public static create(dice: Dice){
        let character = new Character();
        character.culture = CultureCreator.create(dice);
        return character;
    }
}