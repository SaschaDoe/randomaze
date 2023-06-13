import {describe, expect, it} from "vitest";
import {FakeDice} from "../../tables/FakeDice";
import {CultureCreator} from "./CultureCreator";
import {CultureNames} from "../../tables/character/CultureNameTable";
import {Campaign} from "../Campaign";
import {HandlerType, Mediator} from "../Mediator";

describe('culture creator', () => {
    it('should create a culture with first name given roll 0', () => {
        let campaign = new Campaign();
        let mediator = new Mediator(campaign);
        let cultureCreator = mediator.getHandler(HandlerType.CultureCreator);
        cultureCreator.handle(new FakeDice().withRollResult(0));

        expect(campaign.cultures.length).toBe(1);
        expect(campaign.cultures[0].name).toBe(CultureNames[0]);
    });
});