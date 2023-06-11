import {IDGenerator} from "../entities/IDGenerator";

export class Localstorage{
    static saveCampaign(campaign){
        campaign.lastId = IDGenerator.getInstance().getCurrentId();
        localStorage.setItem('campaign', JSON.stringify(campaign));
    }

    static loadCampaign(){
        const savedCampaign = localStorage.getItem('campaign');
        if (savedCampaign) {
             let campaign =  JSON.parse(savedCampaign);
             IDGenerator.getInstance().setId(campaign.lastId);
             return campaign;
        }
    }
}