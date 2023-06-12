import { openDB } from 'idb';

const DB_NAME = 'myAppDatabase';
const STORE_NAME = 'campaigns';

export async function saveCampaign(campaign) {
    console.log('try upgrade database');
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
    await tx.done;
}

export async function loadCampaign() {
    console.log('loadCampaign');
    const db = await openDB(DB_NAME, 3);
    console.log('db', db);
    return await db.get(STORE_NAME, 'currentCampaign');
}