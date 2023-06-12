import {IDGenerator} from "../entities/IDGenerator";
import {Campaign} from "../entities/Campaign";

export class Localstorage{
    static saveCampaign(campaign){
        localStorage.setItem('campaign', campaign);
    }

    static loadCampaign(){
        const savedCampaign = localStorage.getItem('campaign');
        console.log(savedCampaign);
        return savedCampaign;
    }
}