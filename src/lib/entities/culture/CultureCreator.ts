import {Culture} from "./Culture";
import {CultureNameTable} from "../../tables/character/CultureNameTable";
import type {Dice} from "../../tables/Dice";
import type {CampaignHandler} from "../CampaignHandler";
import type {Campaign} from "../Campaign";
import type {Mediator} from "../Mediator";

export class CultureCreator implements CampaignHandler{
    private readonly campaign: Campaign;
    private mediator: Mediator;

    constructor(campaign: Campaign, mediator: Mediator) {
        this.campaign = campaign;
        this.mediator = mediator;
    }

    handle(dice?: Dice): number {
        let name = new CultureNameTable().roll(dice).string
        let culture = new Culture();
        culture.name = name;
        this.campaign.cultures.push(culture);
        return culture.id;
    }
}