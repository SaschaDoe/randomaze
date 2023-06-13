import {describe, expect, it} from "vitest";
import {FakeDice} from "../../tables/FakeDice";
import {CultureNames} from "../../tables/character/CultureNameTable";
import {Genders} from "../../tables/character/GenderTable";
import {HandlerType, Mediator} from "../Mediator";
import {Campaign} from "../Campaign";
import {AfricanMaleNames} from "../../tables/name/african/AfricanMaleNameTable";
import {GermanFemaleFirstnameSingle} from "../../tables/name/german/GermanFemaleFirstnameSingleTable";
describe('character creator', () => {
    const createCharacter = (rollResult: number | string) => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let characterCreator = mediator.getHandler(HandlerType.CharacterCreator);
        characterCreator.handle(new FakeDice().withRollResult(Number(rollResult)));
        return campaign.party[0];
    };

    it.each([
        [0, CultureNames[0], Genders[0], AfricanMaleNames[0]],
        [1, CultureNames[1], Genders[1], GermanFemaleFirstnameSingle[1]]
    ])('should create a character with correct culture, gender, and name given roll %i',
        (rollResult,
         expectedCulture,
         expectedGender,
         expectedName) => {
            let character = createCharacter(rollResult);
            expect(character.culture.name).toBe(expectedCulture);
            expect(character.gender).toBe(expectedGender);
            expect(character.name).toBe(expectedName);
        });
});
