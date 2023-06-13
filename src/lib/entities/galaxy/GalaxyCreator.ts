import type {CampaignHandler} from "../CampaignHandler";
import {Dice} from "../../tables/Dice";
import {Mediator} from "../Mediator";
import {Campaign} from "../Campaign";
import {Galaxy} from "./Galaxy";
import {GalaxyTypeTable} from "../../tables/galaxy/GalaxyTypeTable";
import {GalaxyNameTable} from "../../tables/galaxy/GalaxyNameTable";

export class GalaxyCreator implements CampaignHandler{
    private mediator: Mediator;
    private campaign: Campaign;

    constructor(campaign: Campaign, mediator: Mediator) {
        this.mediator = mediator;
        this.campaign = campaign;
    }
    handle(dice?: Dice): number {
        let galaxy = new Galaxy();
        galaxy.type = new GalaxyTypeTable().roll(dice).string;
        galaxy.name = new GalaxyNameTable().roll(dice).string;
        this.campaign.galaxies.push(galaxy);
        return galaxy.id;
    }

}