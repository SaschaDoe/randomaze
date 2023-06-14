<script>

    import GalaxyDetails from "./GalaxyDetails.svelte";

    export let galaxy;

    let currentTab = 'details';  // 'details', 'systems', 'anomalies'

    let tabs = ['details', 'systems', 'anomalies'];
    let currentIndex = 0;

    function nextTab() {
        if(currentIndex < tabs.length - 1) {
            currentIndex += 1;
            currentTab = tabs[currentIndex];
        }
    }

    function prevTab() {
        if(currentIndex > 0) {
            currentIndex -= 1;
            currentTab = tabs[currentIndex];
        }
    }
</script>

<link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
<div class="container">
    <div class="image-section">
        <div class="galaxy-name-id">{galaxy.id}: {galaxy.name}</div>
        <div class="image-container">
            <img class="galaxy-image" src={galaxy.imagePath} alt="Random Galaxy">
            <div class="color-overlay" style="background: {galaxy.color};"></div>
        </div>
    </div>

    <div class="entity-information">
        <div class="navigation">
            <button on:click={prevTab} disabled={currentIndex === 0} class="nav-button">◀</button>
            <h2>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
            <button on:click={nextTab} disabled={currentIndex === tabs.length - 1} class="nav-button">▶</button>
        </div>

        {#if currentTab === 'details'}
            <GalaxyDetails galaxy={galaxy}></GalaxyDetails>
        {:else if currentTab === 'systems'}
            <p>No System</p>
        {:else if currentTab === 'anomalies'}
           <p>No anomaly</p>
        {/if}
    </div>
</div>

<style>
    .container {
        position: relative;
        padding: 10px;
        font-family: 'Orbitron', sans-serif;
        color: lawngreen;
        background-color: black;
        display: flex;
        justify-content: space-between;
        cursor: crosshair;
    }
    .image-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 350px;
    }
    .galaxy-name-id {
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .image-container {
        position: relative;
        height: 400px;
        width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .entity-information {
        width: 350px;
        border: 2px solid lawngreen;
        border-radius: 10px;
        padding: 10px;
        margin-left: 20px;
        background-color: rgba(0,0,0,0.7);
    }
    .galaxy-image, .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .color-overlay {
        mix-blend-mode: multiply;
    }
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: lawngreen;
        border-bottom: 2px solid lawngreen;
        padding: 10px 0;
    }
    .nav-button {
        background: none;
        border: none;
        color: lawngreen;
        font-size: 1.5em;
        cursor: pointer;
    }
    .nav-button:disabled {
        color: gray;
    }

</style>