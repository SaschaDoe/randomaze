import { openDB } from 'idb';
import {Localstorage} from "./Localstorage";

const DB_NAME = 'myAppDatabase';
const STORE_NAME = 'campaigns';

export async function saveCampaign(campaign) {
    console.log('try upgrade database');
    try{
        const db = await openDB(DB_NAME, 3, {
            upgrade(db) {
                console.log('upgrade database');
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    console.log('no store found');
                    db.createObjectStore(STORE_NAME);
                    console.log('store created');
                }else{
                    console.log('store already exists');
                }
            },
        });
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.put(campaign, 'currentCampaign');
        console.log('before done');
        await tx.done;
    }catch{
        console.log('error in indexDB use localstorage');
        try{
            Localstorage.saveCampaign(campaign);
        }catch(err){
            console.log('error when saving localstorage');
            console.error(err);
        }
    }



}

export async function loadCampaign() {
    try{
        console.log('loadCampaign');
        const db = await openDB(DB_NAME, 3);
        console.log('db', db);
        return await db.get(STORE_NAME, 'currentCampaign');
    }catch{
        console.log('error in indexDB use localstorage');
        try{
            return Localstorage.loadCampaign();
        }catch(err){
            console.log('error when loadings localstorage');
            console.error(err);
        }
    }

}