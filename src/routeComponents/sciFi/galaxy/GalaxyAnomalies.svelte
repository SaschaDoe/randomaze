<script>
    import {GalaxyAnomalieAdder as GalaxyAnomaliesAdder} from "$lib/entities/galaxy/GalaxyAnomalieAdder.ts";

    export let entity;
    $: nothingFound = entity.anomalies.length === 0 && entity.isAlreadyScannedForAnomalies;

    function scan() {
        if(!entity.isAlreadyScannedForAnomalies){
            entity.isAlreadyScannedForAnomalies = true;
            GalaxyAnomaliesAdder.scan(entity);
            entity = entity;
            console.log("Scanned anomalies: ", entity.anomalies);
        }else{
            console.log("Already scanned");
        }
    }
</script>

<div class="entity-details">
    <div class="title-and-button">
        {#if !entity.isAlreadyScannedForAnomalies}
            <h3 class="anomalies-title">Not scanned yet</h3>
            <button class="scan-button" on:click={scan}>Scan</button>
        {:else}
            <h3 class="anomalies-title">Findings</h3>
        {/if}

    </div>
    <ul>
        {#if nothingFound}
            <p>No anomalies found</p>
        {/if}
        {#each entity.anomalies as anomaly}
            <li class="entity-field">
                <div class="field-value">{anomaly}</div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .entity-details {
        display: grid;
        gap: 15px;
        color: lawngreen;
        margin-top: 10px;
    }

    .title-and-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .anomalies-title {
        margin: 0;
    }

    .entity-field {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid lawngreen;
        border-radius: 5px;
    }

    .field-value {
        font-size: 0.9em;
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
</style>
