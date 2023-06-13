import {describe, it, expect} from "vitest";
import {Campaign} from "../Campaign";
import {HandlerType, Mediator} from "../Mediator";
import {FakeDice} from "../../tables/FakeDice";

describe("GalaxyCreator", () => {
    it("should create a galaxy",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);

        mediator.getHandler(HandlerType.GalaxyCreator).handle();

        expect(campaign.galaxies.length).toEqual(1);
    });

    it("should create a galaxy with type spiral given roll 0",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(0);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].type).toEqual("spiral");
    });

    it("should create a galaxy with name  given roll 0",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(0);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].name).toEqual("nebula's veil");
    });
});