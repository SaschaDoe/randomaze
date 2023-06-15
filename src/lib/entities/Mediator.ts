import type {CampaignHandler} from "./CampaignHandler";
import {Campaign} from "./Campaign";
import {CultureCreator} from "./culture/CultureCreator";
import {CharacterCreator} from "./character/CharacterCreator";
import {GalaxyCreator} from "./galaxy/GalaxyCreator";
import {GalaxyAnomalieAdder} from "./galaxy/GalaxyAnomalieAdder";

export enum HandlerType{
    CharacterCreator,
    CultureCreator,
    GalaxyCreator,
    GalaxyAnomalieAdder,
}

export class Mediator {
    private readonly campaign: Campaign;
    private readonly handlers: { [key in HandlerType]?: CampaignHandler };

    constructor(campaign: Campaign) {
        this.campaign = campaign;
        this.handlers = {
            [HandlerType.CharacterCreator]: new CharacterCreator(this.campaign, this),
            [HandlerType.CultureCreator]: new CultureCreator(this.campaign, this),
            [HandlerType.GalaxyCreator]: new GalaxyCreator(this.campaign, this),
        };
    }

    getHandler(type: HandlerType): CampaignHandler {
        if(!this.handlers[type]){
            throw new Error(`Handler ${type} not found`);
        }
        return <CampaignHandler>this.handlers[type];
    }
}