<script>
    import {selectedPlanet} from "./planetStore.ts";
    import {onMount} from "svelte";
    import {selectedSystem} from "../galaxy/systemStore.ts";
    import Modal from "../../../routes/Modal.svelte";
    import {selectedStar} from "./planetStore.ts";
    import StarCardWithAnimation from "../star/StarCardWithAnimation.svelte";

    export let entity;
    let currentSelectedStar = {};
    $: noSystem = entity.stars.length < 1;
    let selectCounter = 0;
    let showStarModal = false;
    function select(star) {
        console.log("select star", star);
        console.log("current selected star", $selectedStar);
        if($selectedStar === star){
            selectCounter++;
        }

        if(selectCounter === 1) {
            selectCounter = 0;
            console.log("show star modal on second click");
            showStarModal = true;
            return;
        }
        currentSelectedStar = star;
        selectedStar.set(star);

    }

    onMount (() => {
        currentSelectedStar = $selectedSystem;
    })


    function closePlanetModal() {
        showStarModal = false;
    }


</script>

<div class="entity-details">
    <div class="systems-list">
        <ul>
            {#if noSystem}
                <p>No stars found</p>
            {/if}
            {#each entity.stars as star}
                <li class="entity-field {($selectedStar === star) ? 'selected' : ''}">
                    <button class="field-name" on:click={() => select(star)}>
                        <span><strong>{star.id}: {star.name}</strong></span>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>

{#if showStarModal}
    <Modal on:close={closePlanetModal}>
        <StarCardWithAnimation star={$selectedStar}/>
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
