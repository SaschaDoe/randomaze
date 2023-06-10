<script>

import CharacterCard from "./CharacterCard.svelte";
import {Character} from "$lib/entities/Character.ts";
import {onMount} from "svelte";
import {Campaign} from "$lib/entities/Campaign.ts";
import {Localstorage} from "$lib/persistence/Localstorage.ts";

let campaign = new Campaign();

function generateParty() {
    let partyMember = new Character();

    campaign.party.push(partyMember);
    console.log("generated new party member"+partyMember.id);
    campaign = campaign; // force reactivity
    Localstorage.saveCampaign(campaign);
}

function loadCampaign() {
    console.log("loading campaign");
    campaign = Localstorage.loadCampaign();
}

onMount(() => {
    console.log("mounted");
    loadCampaign();
    if(!campaign) {
        campaign = new Campaign();
    }
    if(!campaign.party) {
        campaign.party = [];
    }
});

</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Randomaze</h1>

<button on:click={generateParty}>Generate Party Member</button>


<div class="character-list">
    <ul>
        {#each campaign.party as character}
            <li>
                <CharacterCard character={character}></CharacterCard>
            </li>
        {/each}
    </ul>
</div>