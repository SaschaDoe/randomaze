import type {CampaignHandler} from "../CampaignHandler";
import {Dice} from "../../tables/Dice";
import {Mediator} from "../Mediator";
import {Campaign} from "../Campaign";
import {Galaxy} from "./Galaxy";
import {GalaxyTypeTable} from "../../tables/galaxy/GalaxyTypeTable";
import {GalaxyNameTable} from "../../tables/galaxy/GalaxyNameTable";
import {SpiralGalaxyImagesTable} from "../../tables/galaxy/SpiralGalaxyImagesTable";
import {OtherGalaxyImagesTable} from "../../tables/galaxy/OtherGalaxyImagesTable";
import {CssColors} from "../../tables/other/ColoursTable";



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
        galaxy.imagePath = "/galaxies/";
        if(galaxy.type === "spiral"){
            galaxy.imagePath += new SpiralGalaxyImagesTable().roll(dice).string;
        }else{
            galaxy.imagePath += new OtherGalaxyImagesTable().roll(dice).string;
        }
       galaxy.color = this.getColorFrom(galaxy.name);

        this.campaign.galaxies.push(galaxy);
        return galaxy.id;
    }


    private getColorFrom(name: string) {
        for(let color of CssColors){
            if(name.includes(color)){
                return color;
            }
        }
        return "transparent";
    }
}