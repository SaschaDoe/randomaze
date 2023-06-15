import type {CampaignHandler} from "./CampaignHandler";
import {Campaign} from "./Campaign";
import {CultureCreator} from "./culture/CultureCreator";
import {CharacterCreator} from "./character/CharacterCreator";
import {GalaxyCreator} from "./galaxy/GalaxyCreator";
import {SolarSystemCreator} from "./solarSystem/SolarSystemCreator";
import {Galaxy} from "./galaxy/Galaxy";

export enum HandlerType{
    CharacterCreator,
    CultureCreator,
    GalaxyCreator,
    SolarSystemCreator,
}

export class Mediator {
    private readonly campaign: Campaign;
    private readonly handlers: { [key in HandlerType]?: CampaignHandler };
    private solarSystemCreator: SolarSystemCreator;

    constructor(campaign: Campaign) {
        this.campaign = campaign;

        this.solarSystemCreator = new SolarSystemCreator(this.campaign, this);
        this.handlers = {
            [HandlerType.CharacterCreator]: new CharacterCreator(this.campaign, this),
            [HandlerType.CultureCreator]: new CultureCreator(this.campaign, this),
            [HandlerType.GalaxyCreator]: new GalaxyCreator(this.campaign, this),
            [HandlerType.SolarSystemCreator]: new SolarSystemCreator(this.campaign, this),
        };
    }

    getHandler(type: HandlerType): CampaignHandler {
        if(!this.handlers[type]){
            throw new Error(`Handler ${type} not found`);
        }
        return <CampaignHandler>this.handlers[type];
    }

    getSolarSystemCreatorFor(galaxy: Galaxy): SolarSystemCreator{
        if(!galaxy){
            throw new Error(`Galaxy not found`);
        }
        return this.solarSystemCreator.withGalaxy(galaxy);
    }
}