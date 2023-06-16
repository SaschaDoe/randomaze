<script>
    import {SolarSystemCreator} from "$lib/entities/solarSystem/SolarSystemCreator.ts";
    import {selectedSystem} from "./systemStore.ts";

    export let entity;
    $: noSystem = entity.solarSystems.length === 0 && entity.isAlreadyScannedForSystems;
    let selectedSolarSystem = null;

    function scan() {
        let solarSystem = SolarSystemCreator.addTo(entity);
        selectedSolarSystem = solarSystem;
        selectedSystem.set(solarSystem);
        entity = entity;
    }

    function selectSystem(system) {
        selectedSolarSystem = system;
        selectedSystem.set(system);
    }
</script>

<div class="entity-details">
    <div class="title-and-button">
        <button class="scan-button" on:click={scan}>Scan for new System</button>
    </div>
    <div class="systems-list">
        <ul>
            {#if noSystem}
                <p>No systems found</p>
            {/if}
            {#each entity.solarSystems as system}
                <li class="entity-field {selectedSolarSystem === system ? 'selected' : ''}">
                    <button class="field-name" on:click={() => selectSystem(system)}>{system.id}: {system.name}</button>
                </li>
            {/each}
        </ul>
    </div>
</div>

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

    .title-and-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .scan-button {
        background: none;
        border: 2px solid lawngreen;
        color: lawngreen;
        font-size: 1em;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .scan-button:hover {
        background: lawngreen;
        color: black;
    }

    .scan-button:disabled {
        color: gray;
        border-color: gray;
        cursor: not-allowed;
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


</style>
