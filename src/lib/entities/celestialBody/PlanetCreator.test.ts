import {describe, it, expect, beforeEach} from "vitest";
import {SolarSystemCreator} from "../solarSystem/SolarSystemCreator";
import {PlanetCreator} from "./PlanetCreator";
import type {Planet} from "./Planet";
import type {SolarSystem} from "../solarSystem/SolarSystem";
import {FakeDice} from "../../tables/FakeDice";

describe("PlanetCreator", () => {
    let planet: Planet;
    let solarSystem: SolarSystem;
    let fakeDice: FakeDice;

    beforeEach(() => {
        solarSystem = SolarSystemCreator.create();
        solarSystem.habitableZoneStart = 100;  // Replace with your actual values
        solarSystem.habitableZoneEnd = 300;  // Replace with your actual values
        fakeDice = new FakeDice().withRollResult(0);
    });

    // ... Your existing tests

    it("should create an earthlike planet in the habitable zone given roll less than 0.3", () => {
        fakeDice.withRollRandomResult(0.2);  // Roll random result less than 0.3
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.type).toEqual("lethalice");
    });

    it("should create a non-earthlike planet in the habitable zone given roll equal or more than 0.3", () => {
        fakeDice.withRollRandomResult(0.3);  // Roll random result equal to 0.3
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.type).not.toEqual("earthlike");
    });

    it("should create a planet",  () => {
        planet = PlanetCreator.addTo(solarSystem);
        expect(solarSystem.planets.length).toEqual(1);
    });

    it("should create a planet with type desert given roll 0",  () => {
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.type).toEqual("lethalice");
    })

    it("should create a planet with name nur nur given roll 0",  () => {
        planet = PlanetCreator.addTo(solarSystem, fakeDice);

        expect(planet.name).toEqual('نور');
        expect(planet.nameTranslation).toEqual("nur");
        expect(planet.nameMeaning).toEqual("(Light)");
    })

    it("should create a planet with obliquity",  () => {
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.obliquity).toEqual(0);
    })

    it("should create a planet ring",  () => {
        fakeDice = new FakeDice().withRollResult(1);
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.rings[0].name).toEqual("ice");
    })
});