import {describe} from "vitest";
import {FakeDice} from "../../tables/FakeDice";
import {CharacterCreator} from "./CharacterCreator";
import {CultureNames} from "../../tables/character/CultureNameTable";

describe('character creator', () => {
    it('should create a character', () => {
        let character = CharacterCreator.create(new FakeDice().withRollResult(1));

        expect(character.culture.name).toBe(CultureNames[0]);
    });
});