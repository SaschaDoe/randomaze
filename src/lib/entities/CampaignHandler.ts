import type {Dice} from "../tables/Dice";

export interface CampaignHandler {
    handle(dice?: Dice): number;
}