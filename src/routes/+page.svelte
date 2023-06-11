<script>

import CharacterCard from "./CharacterCard.svelte";
import {onMount} from "svelte";
import {Campaign} from "$lib/entities/Campaign.ts";
import {IDGenerator} from "$lib/entities/IDGenerator.ts";
import {loadCampaign, saveCampaign} from "$lib/persistence/IndexedDB.ts";
import { campaignData } from "$lib/stores";
import {CharacterCreator} from "$lib/entities/character/CharacterCreator.ts";

let campaign = new Campaign();

onMount(async () => {
    console.log("mounted");
    await onLoad();
});

function addPartyMember() {
    let partyMember = CharacterCreator.create();
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
    campaign = {...campaign};
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

<style>

    button {
        padding: 10px 20px;
        font-size: 1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-right: 10px;
    }

    .character-list {
        margin: 20px 0;
    }

    .character-list ul {
        list-style-type: none;
        padding: 0;
    }

    .character-list li {
        margin-bottom: 10px;
    }


</style>
