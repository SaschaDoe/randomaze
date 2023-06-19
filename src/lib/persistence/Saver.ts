import {Campaign} from "../entities/Campaign";
import {IDGenerator} from "../entities/IDGenerator";
import {loadCampaign, saveCampaign} from "./IndexedDB";
import {campaignData} from "../stores";
import {Mediator} from "../entities/Mediator";
import {writable} from "svelte/store";

export let campaignStore = writable(new Campaign())
export let PersistantCmpaign = new Campaign()

export async function Save(){
    console.log("onSave");
    console.log(PersistantCmpaign);
    PersistantCmpaign.lastId = IDGenerator.getInstance().getCurrentId();
    const serializedCampaign = JSON.stringify(PersistantCmpaign);
    console.log("saving campaign: "+serializedCampaign);
    await saveCampaign(serializedCampaign);
    campaignData.set(serializedCampaign);

    // Update the Svelte store
    campaignStore.set(PersistantCmpaign);
}

export async function Load(){
    console.log("try to load campaign");
    const serializedCampaign = await loadCampaign();
    let mediator;
    if (serializedCampaign) {
        try{
            const loadedCampaign = JSON.parse(serializedCampaign);
            campaignStore.set(loadedCampaign); // This will cause a re-render
            PersistantCmpaign = loadedCampaign;
        } catch (e) {
            console.log("error parsing campaign in onLoad")
            console.log(e);
            PersistantCmpaign = new Campaign();
            campaignStore.set(PersistantCmpaign);
        }
        IDGenerator.getInstance().setId(PersistantCmpaign.lastId);
        campaignData.set(serializedCampaign);
        console.log("loaded campaign");
    } else {
        console.log("no campaign found");
        PersistantCmpaign = new Campaign();
        campaignStore.set(PersistantCmpaign);
    }
    mediator = new Mediator(PersistantCmpaign);
    return mediator;
}