<script>
    import {selectedPlanet} from "./planetStore.ts";
    import {onMount} from "svelte";
    import {selectedSystem} from "../galaxy/systemStore.ts";
    import Modal from "../../../routes/Modal.svelte";
    import PlanetCardWithAnimation from "../planet/PlanetCardWithAnimation.svelte";

    export let entity;
    let currentSelectedPlanet = {};
    $: noSystem = entity.planets.length < 1;
    let selectCounter = 0;
    let showPlanetModal = false;
    function selectSystem(planet) {
        if($selectedPlanet === planet){
            selectCounter++;
        }

        if(selectCounter === 1) {
            selectCounter = 0;
            console.log("closeModal in GalaxyAddSystems");

            showPlanetModal = true;
            return;
        }
        currentSelectedPlanet = planet;
        selectedPlanet.set(planet);

    }

    onMount (() => {
        currentSelectedPlanet = $selectedSystem;
    })


    function closePlanetModal() {
        showPlanetModal = false;
    }

    
</script>

<div class="entity-details">
    <div class="systems-list">
        <ul>
            {#if noSystem}
                <p>No planets found</p>
            {/if}
            {#each entity.planets as planet}
                <li class="entity-field {($selectedPlanet === planet) ? 'selected' : ''}">
                <button class="field-name" on:click={() => selectSystem(planet)}>
                        <span><strong>{planet.id}: {planet.name}</strong></span>
                        {#if planet.nameTranslation !== "-"}
                            <span>{planet.nameTranslation} </span>
                            <span>{planet.nameMeaning}</span>
                        {/if}
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>

{#if showPlanetModal}
    <Modal on:close={closePlanetModal}>
        <PlanetCardWithAnimation planet={$selectedPlanet}/>
    </Modal>
{/if}

<style>
    .entity-details {
        display: grid;
        gap: 15px;
        color: lawngreen;
        margin-top: 10px;
        overflow: hidden;
    }

    .entity-field:hover .field-name,
    .entity-field.selected .field-name {
        background: lawngreen;
        color: black;
    }
    .systems-list {
        max-height: 300px; /* Adjust this value as needed */
        overflow-y: auto;
    }

    .systems-list ul {
        list-style-type: none;
        padding: 0; /* Optional: remove default padding */
    }

    .systems-list::-webkit-scrollbar {
        width: 10px;
    }

    .systems-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .systems-list::-webkit-scrollbar-thumb {
        background: lawngreen;
        border-radius: 5px;
    }

    .systems-list::-webkit-scrollbar-thumb:hover {
        background: darkgreen;
    }

    .entity-field:hover {
        background: rgba(0, 0, 0, 0.9); /* Slightly less transparent on hover */
    }

    .field-name {
        background: none;
        color: lawngreen;
        font-size: 1em;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
        width: 100%;
        border: none;
    }

    .field-name:hover {
        background: lawngreen;
        color: black;
    }

    .field-name:disabled {
        color: gray;
        border-color: gray;
        cursor: not-allowed;
    }

    .field-name span {
        display: block;
    }


</style>
