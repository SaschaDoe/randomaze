import {describe, it, expect, beforeEach} from "vitest";
import {Star} from "./Star";
import {StarCreator} from "./StarCreator";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {FakeDice} from "../../tables/FakeDice";

describe("StarCreator", () => {
    let solarSystem: SolarSystem;
    let fakeDice: FakeDice;

    beforeEach(() => {
        solarSystem = new SolarSystem();
        fakeDice = new FakeDice().withRollResult(0);
    });

    it("should create a star",  () => {
        let stars = StarCreator.addTo(solarSystem);

        expect(solarSystem.stars.length).greaterThan(0);
    });

    it("should create a star with size",  () => {
        let stars = StarCreator.addTo(solarSystem, fakeDice);

        expect(solarSystem.stars[0].size).toEqual("tiny");
    });

    it("should create a star with stage",  () => {
        let stars = StarCreator.addTo(solarSystem, fakeDice);

        expect(solarSystem.stars[0].stage).toEqual("molecular cloud");
    });

    it("should create a star with luminosity",  () => {
        let stars = StarCreator.addTo(solarSystem, fakeDice);

        expect(solarSystem.stars[0].luminosity).toEqual(0.00014481546878700503);
    });

    it("should create a star with mass",  () => {
        let stars = StarCreator.addTo(solarSystem, fakeDice);

        expect(solarSystem.stars[0].mass).toEqual(0.08000000000000002);
    });
});