import {Dice} from "../tables/Dice";

export interface CampaignHandler {
    handle(dice?: Dice): number;
}