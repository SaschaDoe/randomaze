import {beforeEach, describe, expect, it} from "vitest";
import {Campaign} from "../Campaign";
import {HandlerType, Mediator} from "../Mediator";
import {FakeDice} from "../../tables/FakeDice";
import {SolarSystemCreator} from "./SolarSystemCreator";

describe("SolarSystemCreator", () => {
    let campaign: Campaign;
    let mediator: Mediator;

    beforeEach(() => {
        campaign = new Campaign();
        mediator = new Mediator(campaign);
    });

    it("should create solar system ",  () => {

        mediator.getHandler(HandlerType.GalaxyCreator).handle();
        SolarSystemCreator.addTo(campaign.galaxies[0]);

        expect(campaign.galaxies[0].solarSystems.length).toEqual(1);
    });

    it("should create solar system with name ",  () => {

        mediator.getHandler(HandlerType.GalaxyCreator).handle();
        let fakeDice = new FakeDice().withRollResult(0);
        let solarSystem = SolarSystemCreator.addTo(campaign.galaxies[0], fakeDice);

        expect(solarSystem.name).toEqual("adalbald system 0");
    });
});