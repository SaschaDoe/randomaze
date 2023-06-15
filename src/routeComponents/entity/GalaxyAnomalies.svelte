<script>
    import {GalaxyAnomalieAdder as GalaxyAnomaliesAdder} from "$lib/entities/galaxy/GalaxyAnomalieAdder.ts";

    export let galaxy;
    $: nothingFound = galaxy.anomalies.length === 0 && galaxy.isAlreadyScannedForAnomalies;

    function scan() {
        if(!galaxy.isAlreadyScannedForAnomalies){
            galaxy.isAlreadyScannedForAnomalies = true;
            GalaxyAnomaliesAdder.scan(galaxy);
            galaxy = galaxy;
            console.log("Scanned anomalies: ", galaxy.anomalies);
        }else{
            console.log("Already scanned");
        }
    }
</script>

<div class="entity-details">
    <div class="title-and-button">
        {#if !galaxy.isAlreadyScannedForAnomalies}
            <h3 class="anomalies-title">Not scanned yet</h3>
        {:else}
            <h3 class="anomalies-title">Findings</h3>
        {/if}
        <button class="scan-button" on:click={scan}>Scan</button>
    </div>
    <ul>
        {#if nothingFound}
            <p>No anomalies found</p>
        {/if}
        {#each galaxy.anomalies as anomaly}
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
