<script>
import {onMount} from "svelte";
import {Campaign} from "$lib/entities/Campaign.ts";
import {IDGenerator} from "$lib/entities/IDGenerator.ts";
import {loadCampaign, saveCampaign} from "$lib/persistence/IndexedDB.ts";
import { campaignData } from "$lib/stores";
import Modal from "./Modal.svelte";
import { tick } from 'svelte';
import {HandlerType, Mediator} from "$lib/entities/Mediator.ts";
import EntityCard from "./EntityCard.svelte";
import EntitySideIndex from "./EntitySideIndex.svelte";

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

function scrollToEntity(event) {
    scrollToNewMember(event.detail);
}

onMount(async () => {
    console.log("mounted");
    await onLoad();
});

function addPartyMember() {
    let partyMemberId = mediator.getHandler(HandlerType.CharacterCreator).handle();
    addEntity(partyMemberId);
}

function addCulture() {
    let cultureId = mediator.getHandler(HandlerType.CultureCreator).handle();
    addEntity(cultureId);
}

function addGalaxy() {
    let galaxyId = mediator.getHandler(HandlerType.GalaxyCreator).handle();
    addEntity(galaxyId);
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
    mediator = new Mediator(campaign);
    IDGenerator.getInstance().setId(0)
    onSave();
}

function deleteEntity(event) {
    const { id, type } = event.detail;
    console.log(`Deleting ${type} with id ${id}`);

    switch (type) {
        case 'character':
            campaign.party = campaign.party.filter(p => p.id !== id);
            break;
        case 'culture':
            campaign.cultures = campaign.cultures.filter(c => c.id !== id);
            break;
        // Add additional cases for other types here
        default:
            console.error(`Unknown entity type: ${type}`);
    }

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
        try{
            campaign = JSON.parse(serializedCampaign);
        } catch (e) {
            console.log("error parsing campaign in onLoad")
            console.log(e);
            campaign = new Campaign();
        }
        mediator = new Mediator(campaign);
        IDGenerator.getInstance().setId(campaign.lastId);
        campaignData.set(serializedCampaign);
        console.log("loaded campaign");
    } else {
        console.log("no campaign found");
    }
}

let showResetModal = false;
function closeResetModal() {
    showResetModal = false;
}

function openResetModal(e) {
    e.stopPropagation();
    showResetModal = true;
}

</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="main-container">
    <EntitySideIndex campaign={campaign}></EntitySideIndex>
    <div class="home-header">

        <button class="reset-button" on:click={openResetModal}>Reset</button>
        {#if showResetModal}
            <Modal on:close={closeResetModal}>
                <h2>Do you want to reset all?</h2>
                <button on:click={() => { reset(); closeResetModal(); }}>Yes</button>
                <button on:click={closeResetModal}>No</button>
            </Modal>
        {/if}

        <button class="add-button" on:click={openModal}><strong>+</strong></button>
    </div>
    <div class="entities-container">
        {#if isModalOpen}
            <Modal on:close={closeModal}>
                <button on:click={addPartyMember}>Add Party Member</button>
                <button on:click={addCulture}>Add Culture</button>
                <button on:click={addGalaxy}>Add Galaxy</button>
            </Modal>
        {/if}

        <div class="character-list">
            {#if campaign.party.length > 0}
                <h2 id="Characters">Characters</h2>
                <h2 id="Party">Party</h2>
                <ul>
                    {#each campaign.party as character}
                        <li id={character.id}>
                            <EntityCard entity={character} type="character" on:deleteEntity={deleteEntity} on:scrollToEntity={scrollToEntity} />
                        </li>
                    {/each}
                </ul>
            {/if}
            {#if campaign.cultures.length > 0}
                <h2 id="Cultures">Cultures</h2>
                <ul>

                    {#each campaign.cultures as culture}
                        <li id={culture.id}>
                            <EntityCard entity={culture} type="culture" on:deleteEntity={deleteEntity} />
                        </li>
                    {/each}
                </ul>
            {/if}
            {#if campaign.galaxies.length > 0}
                <h2 id="Galaxies">Galaxies</h2>
                <ul>
                    {#each campaign.galaxies as galaxy}
                        <li id={galaxy.id}>
                            <EntityCard entity={galaxy} type="galaxy" on:deleteEntity={deleteEntity} on:scrollToEntity={scrollToEntity} />
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</div>

<style>
    .main-container {
        display: flex;
        align-items: start; /* aligns items to start of the main axis */
        justify-content: space-between; /* provides space between flex items */
        gap: 1rem; /* provides gap between flex items */

    }

    .entities-container {
        flex-basis: 80%; /* sets initial size of the entities-container */
        position: relative; /* sets the positioning context for its children */
        margin-top: 50px;
    }

    .home-header{
        position: fixed; /* makes the header stick to the top of the entities-container */
        margin-top: 7px;
        width: 100%;
        background-color: white;
        z-index: 1; /* ensures the header is displayed above other content */
    }


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



    .reset-button{
        background-color: #ff0000;
        color: #ffffff;
    }

    .add-button{
        background-color: green;
        color: #ffffff;
    }


</style>
