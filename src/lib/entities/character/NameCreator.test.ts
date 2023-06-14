import {describe} from "vitest";
import {NameCreator} from "./NameCreator";
import {Genders} from "../../tables/character/GenderTable";
import {Culture} from "../culture/Culture";
import {CultureNames} from "../../tables/character/CultureNameTable";
import {FakeDice} from "../../tables/FakeDice";

describe('nameCreator', () => {
    it('should give Abioye when given male african with 0', function () {
        let femaleGender = Genders[0];
        let africanCulture = new Culture();
        africanCulture.name = CultureNames[0];
        let nameCreator = new NameCreator()
            .withGender(femaleGender)
            .withCulture(africanCulture);
        let fakeDice = new FakeDice().withRollResult(0);

        let name = nameCreator.create(fakeDice);

        expect(name).toBe("abioye");
    });

    it('should give Gutda when given female german with 0', function () {
        let maleGender = Genders[1];
        let germanCulture = new Culture();
        germanCulture.name = CultureNames[1];
        let nameCreator = new NameCreator()
            .withGender(maleGender)
            .withCulture(germanCulture);
        let fakeDice = new FakeDice().withRollResult(0);

        let name = nameCreator.create(fakeDice);

        expect(name).toBe("gutda");
    });
})