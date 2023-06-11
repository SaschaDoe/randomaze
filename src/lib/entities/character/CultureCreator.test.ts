import {describe, expect} from "vitest";
import {FakeDice} from "../../tables/FakeDice";
import {CultureCreator} from "./CultureCreator";
import {CultureNames, CultureNameTable} from "../../tables/character/CultureNameTable";

describe('culture creator', () => {
    it('should create a culture', () => {
        let culture = CultureCreator.create(new FakeDice().withRollResult(1));

        expect(culture.name).toBe(CultureNames[0]);
    });
});