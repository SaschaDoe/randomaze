import {beforeEach, describe} from "vitest";
import {MoonCreator} from "./MoonCreator";
import {PlanetCreator} from "../PlanetCreator";
import type {Dice} from "../../../tables/Dice";
import {FakeDice} from "../../../tables/FakeDice";

describe("MoonCreator", () => {
    let fakeDice: Dice;

    beforeEach(() => {
        fakeDice = new FakeDice().withRollResult(0);
    });

    it("should create Moon", () => {
        let moon = MoonCreator.create();

        expect(moon.id).greaterThan(0);
    });

    it("should create Moon with a name", () => {
        let moon = MoonCreator.create(fakeDice);

        expect(moon.name).toEqual("نور");
    });

    it("should create Moon with a size", () => {
        let moon = MoonCreator.create(fakeDice);

        expect(moon.size).toEqual("tiny");
    });

    it("should create Moon with distance", () => {
        let moon = MoonCreator.create(fakeDice);

        expect(moon.distance).toEqual("tiny");
    });
});