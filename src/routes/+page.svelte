<script>

import CharacterCard from "./CharacterCard.svelte";
import {onMount} from "svelte";
import {Campaign} from "$lib/entities/Campaign.ts";
import {IDGenerator} from "$lib/entities/IDGenerator.ts";
import {loadCampaign, saveCampaign} from "$lib/persistence/IndexedDB.ts";
import { campaignData } from "$lib/stores";
import Modal from "./Modal.svelte";
import { tick } from 'svelte';
import {HandlerType, Mediator} from "$lib/entities/Mediator.ts";

let campaign = new Campaign();
let mediator = new Mediator(campaign);

let isModalOpen = false;


function openModal() {
    isModalOpen = true;
}

function closeModal() {
    isModalOpen = false;
}



function scrollToNewMember(id) {
    tick().then(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

onMount(async () => {
    console.log("mounted");
    await onLoad();
});

function addPartyMember() {
    let partyMemberId = mediator.getHandler(HandlerType.CharacterCreator).handle();
    addEntity(partyMemberId);
}

function addEntity(id){
    console.log("generated new entity with id "+id);
    campaign = campaign;
    onSave();
    isModalOpen = false;
    scrollToNewMember(id);
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
    console.log("saving campaign: "+serializedCampaign);
    await saveCampaign(serializedCampaign);
    campaignData.set(serializedCampaign);
}

async function onLoad() {
    console.log("try to load campaign");
    const serializedCampaign = await loadCampaign();
    if (serializedCampaign) {
        campaign = JSON.parse(serializedCampaign);
        mediator = new Mediator(campaign);
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

<div class="home-header">
    <button class="reset-button" on:click={reset}>Reset</button>
    <button class="add-button" on:click={openModal}><strong>+</strong></button>
</div>

{#if isModalOpen}
    <Modal on:close={closeModal}>
        <button on:click={addPartyMember}>Add Party Member</button>
    </Modal>
{/if}



<div class="character-list">
    <h2 id="Characters">Characters</h2>
    <ul>
        {#each campaign.party as character}
            <li id={character.id}>
                <CharacterCard character={character} on:deletePartyMember={deletePartyMember}></CharacterCard>
            </li>
        {/each}
    </ul>
    <h2 id="Cultures">Cultures</h2>
    <!--
    <ul>
        {#each campaign.cultures as culture}
            <li id={culture.id}>
                <CultureCard culture={culture} on:deletePartyMember={deleteCulture}></CultureCard>
            </li>
        {/each}
    </ul>
    -->
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

    .home-header{
        margin-top: 7px;
        position: fixed;
        background-color: white;
        width: 100%;
    }

    .reset-button{
        background-color: #ff0000;
        color: #ffffff;
    }

    .add-button{
        background-color: green;
        color: #ffffff;
    }


</style>
