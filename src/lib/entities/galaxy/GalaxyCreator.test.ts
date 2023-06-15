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

        expect(campaign.galaxies[0].name).toEqual("shattered veil 0");
    });

    it("should create a galaxy with first spiral image given roll 0",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(0);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].imagePath).toEqual("/galaxies/AndromedaGalaxy.png");
    });

    it("should create a galaxy with second other galaxy image given roll 1",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].imagePath).toEqual("/galaxies/MedusaGalaxy.png");
    });

    it("should create a galaxy with color transparent given no colour in name",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(0);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].name).toEqual("shattered veil 0");
        expect(campaign.galaxies[0].color).toEqual("transparent");
    });


    it("should create a galaxy with color red given yellow in name",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1).withRollResults([1,2]);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].name).toEqual("orange lens 1");
        expect(campaign.galaxies[0].color).toEqual("orange");
    });

    it("should create a galaxy with rotation velocity > 150 and < 300",  () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].rotationVelocity).greaterThan(150).lessThan(301);
    });

    it("should create a galaxy with size tiny, small, medium, large, gigantic", () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        const possibleSizes = ["tiny", "small", "medium", "large", "gigantic"];
        expect(possibleSizes).toContain(campaign.galaxies[0].size);
    });

    it("should create a galaxy with mass tiny, small, medium, large, gigantic", () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        const possibleSizes = ["tiny", "small", "medium", "large", "gigantic"];
        expect(possibleSizes).toContain(campaign.galaxies[0].mass);
    });

    it("should create a galaxy with age ancient, old, middle-aged, young, just-created", () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        const possibleSizes = ["just-created", "young", "middle-aged", "old", "ancient"];
        expect(possibleSizes).toContain(campaign.galaxies[0].age);
    });

    it("should create a galaxy with big in its name than it is that size", () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let fakeDice = new FakeDice().withRollResult(1).withRollResults([1,7]);

        mediator.getHandler(HandlerType.GalaxyCreator).handle(fakeDice);

        expect(campaign.galaxies[0].name).toEqual("small nebular 1");
        expect(campaign.galaxies[0].size).toEqual("small");
    });
});