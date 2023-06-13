import {Dice} from "../../tables/Dice";
import {Character} from "./Character";
import {GenderTable} from "../../tables/character/GenderTable";
import {NameCreator} from "./NameCreator";
import type {CampaignHandler} from "../CampaignHandler";
import {Campaign} from "../Campaign";
import {HandlerType, Mediator} from "../Mediator";

export class CharacterCreator implements CampaignHandler{
    private readonly campaign: Campaign;
    private mediator: Mediator;
    constructor(campaign: Campaign, mediator: Mediator) {
        this.campaign = campaign;
        this.mediator = mediator;
    }

    handle(dice?: Dice): number {
        let character = new Character();
        let cultureCreator = this.mediator.getHandler(HandlerType.CultureCreator);
        cultureCreator.handle(dice);
        character.culture = this.campaign.cultures[0]; //TODO choose one culture
        character.gender = new GenderTable().roll(dice).string;
        let nameCreator = new NameCreator()
            .withCulture(character.culture)
            .withGender(character.gender);
        character.name = nameCreator.create(dice);
        this.campaign.party.push(character);
        return character.id;
    }
}