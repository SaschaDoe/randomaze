import {describe, it, expect, beforeEach} from "vitest";
import {SolarSystemCreator} from "../solarSystem/SolarSystemCreator";
import {PlanetCreator} from "./PlanetCreator";
import {Planet} from "./Planet";
import {SolarSystem} from "../solarSystem/SolarSystem";
import {FakeDice} from "../../tables/FakeDice";

describe("PlanetCreator", () => {
    let planet: Planet;
    let solarSystem: SolarSystem;
    let fakeDice: FakeDice;

    beforeEach(() => {
        solarSystem = SolarSystemCreator.create();
        fakeDice = new FakeDice().withRollResult(0);
    });

    it("should create a planet",  () => {
        planet = PlanetCreator.addTo(solarSystem);
        expect(solarSystem.planets.length).toEqual(1);
    });

    it("should create a planet with type desert given roll 0",  () => {
        planet = PlanetCreator.addTo(solarSystem, fakeDice);
        expect(planet.type).toEqual("desert");
    })

    it("should create a planet with name nur nur given roll 0",  () => {
        planet = PlanetCreator.addTo(solarSystem, fakeDice);

        expect(planet.name).toEqual('نور');
        expect(planet.nameTranslation).toEqual("nur");
        expect(planet.nameMeaning).toEqual("(Light)");
    })
});