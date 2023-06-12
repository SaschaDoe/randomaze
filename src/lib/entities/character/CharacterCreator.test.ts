import {describe, it, expect} from "vitest";
import {FakeDice} from "../../tables/FakeDice";
import {CharacterCreator} from "./CharacterCreator";
import {CultureNames} from "../../tables/character/CultureNameTable";
import {Genders} from "../../tables/character/GenderTable";

describe('character creator', () => {
    it('should create a character with culture', () => {
        let character = CharacterCreator.create(new FakeDice().withRollResult(1));

        expect(character.culture.name).toBe(CultureNames[0]);
    });

    it('should create a character with gender', () => {
        let character = CharacterCreator.create(new FakeDice().withRollResult(1));

        expect(character.gender).toBe(Genders[0]);
    });
});