export class Localstorage{
    static saveCampaign(campaign){
        localStorage.setItem('campaign', JSON.stringify(campaign));
    }

    static loadCampaign(){
        const savedCampaign = localStorage.getItem('campaign');
        if (savedCampaign) {
             return JSON.parse(savedCampaign);
        }
    }
}