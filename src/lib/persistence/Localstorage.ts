import {Campaign, getEntityTypes} from "../entities/Campaign";
import {loadCampaign} from "./IndexedDB";

export class Localstorage {
    static saveCampaign(campaign) {
        try {
            localStorage.setItem('campaign', campaign);
        } catch (err) {
            console.log("Error saving campaign in Local storage: " + err);
        }

    }

    static loadCampaign() {
        try {
            const serializedLoadedCampaign = localStorage.getItem('campaign');
            const loadedCampaign = JSON.parse(serializedLoadedCampaign);
            const savedCampaignKeys = getEntityTypes(loadedCampaign);
            const newCampaignKeys = getEntityTypes(new Campaign());

            const hasAllLists = newCampaignKeys.every((key) => savedCampaignKeys.includes(key));

            if (hasAllLists) {
                console.log("This is the loadedCampaign: ");
                console.log(serializedLoadedCampaign);
                return serializedLoadedCampaign;
            } else {
                console.log("Saved campaign is missing one or more lists. Returning a new campaign instance.");
                let campaign =  new Campaign();
                let serializedCampaign = JSON.stringify(campaign);
                this.saveCampaign(serializedCampaign);
                return Localstorage.loadCampaign();
            }
        } catch (err) {
            console.log("Error loading campaign from Local storage: " + err);
            let campaign =  new Campaign();
            let serializedCampaign = JSON.stringify(campaign);
            this.saveCampaign(serializedCampaign);
            return Localstorage.loadCampaign();
        }
    }
}