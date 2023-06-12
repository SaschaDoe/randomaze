import {Dice} from "../../tables/Dice";
import {Character} from "./Character";
import {CultureCreator} from "./CultureCreator";
import {GenderTable} from "../../tables/character/GenderTable";
import {NameCreator} from "./NameCreator";

export class CharacterCreator{
    public static create(dice?: Dice){
        let character = new Character();
        character.culture = CultureCreator.create(dice);
        character.gender = new GenderTable().roll(dice).string;
        let nameCreator = new NameCreator()
            .withCulture(character.culture)
            .withGender(character.gender);
        character.name = nameCreator.create(dice);
        return character;
    }
}