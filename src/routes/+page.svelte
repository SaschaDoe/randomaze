<script>

import CharacterCard from "./CharacterCard.svelte";
import {Character} from "$lib/entities/Character.ts";
import {onMount} from "svelte";
import {Campaign} from "$lib/entities/Campaign.ts";
import {IDGenerator} from "$lib/entities/IDGenerator.ts";
import {loadCampaign, saveCampaign} from "$lib/persistence/IndexedDB.ts";
import { campaignData } from "$lib/stores";

let campaign = new Campaign();

onMount(async () => {
    console.log("mounted");
    await onLoad();
});

function addPartyMember() {
    let partyMember = new Character();
    campaign.party.push(partyMember);
    console.log("generated new party member"+partyMember.id);
    campaign = campaign; // force reactivity
    onSave();
}


function reset() {
    console.log("resetting");
    campaign = new Campaign();
    IDGenerator.getInstance().setId(0)
    onSave();
}

function deletePartyMember(event) {
    console.log("deleting party member "+event.detail);
    campaign.party = campaign.party.filter(p => p.id !== (event.detail));
    campaign = {...campaign}; // trigger reactivity
    onSave();
}

async function onSave() {
    console.log("onSave");
    campaign.lastId = IDGenerator.getInstance().getCurrentId();
    const serializedCampaign = JSON.stringify(campaign);
    await saveCampaign(serializedCampaign);
    campaignData.set(serializedCampaign);
}

async function onLoad() {
    console.log("try to load campaign");
    const serializedCampaign = await loadCampaign();
    if (serializedCampaign) {
        campaign = JSON.parse(serializedCampaign);
        IDGenerator.getInstance().setId(campaign.lastId);
        campaignData.set(serializedCampaign);
        console.log("loaded campaign");
    } else {
        console.log("no campaign found");
    }
}


</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Randomaze</h1>


<button on:click={reset}>Reset</button>
<button on:click={addPartyMember}>Generate Party Member</button>


<div class="character-list">
    <ul>
        {#each campaign.party as character}
            <li>
                <CharacterCard character={character} on:deletePartyMember={deletePartyMember}></CharacterCard>
            </li>
        {/each}
    </ul>
</div>