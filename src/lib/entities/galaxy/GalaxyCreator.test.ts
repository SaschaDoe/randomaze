import {describe, it, expect} from "vitest";
import {Campaign} from "../Campaign";
import {HandlerType, Mediator} from "../Mediator";

describe("GalaxyCreator", () => {
    it("should create a galaxy",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);

        mediator.getHandler(HandlerType.GalaxyCreator).handle();

        expect(campaign.galaxies.length).toEqual(1);
    });
});