<script>
    import GalaxyDetails from "./GalaxyDetails.svelte";
    import GalaxyAnomalies from "./GalaxyAnomalies.svelte";
    import GalaxyAddSystem from "./GalaxyAddSystem.svelte";
    import SciFiCard from "../SciFiCard.svelte";
    import {selectedSystem} from "./systemStore.ts";
    export let galaxy;

    let components = [
        { name: 'details', component: GalaxyDetails },
        { name: 'systems', component: GalaxyAddSystem },
        { name: 'anomalies', component: GalaxyAnomalies },
    ];
</script>


<SciFiCard entity={galaxy} components={components} defaultTab="details">
    <div slot="image">
        <div class="galaxy-name-id">{galaxy.id}: {galaxy.name}</div>
        <div class="image-container">
            <img class="galaxy-image" src={galaxy.imagePath} alt="Random Galaxy">
            {#each galaxy.solarSystems as system (system.id)}
                {#if $selectedSystem && system.id === $selectedSystem.id}
                    <div class="solar-system-bracket" style="left: {system.positionX}px; top: {system.positionY}px;"></div>
                {/if}
            {/each}
            <div class="color-overlay" style="background: {galaxy.color};"></div>
        </div>
    </div>
</SciFiCard>

<style>
    .image-container {
        position: relative;
        height: 400px;
        width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .galaxy-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* This line ensures the aspect ratio is maintained */
    }
    .solar-system-bracket {
        position: absolute;
        border: 2px solid lawngreen; /* Adjust color as needed */
        width: 25px; /* Adjust size as needed */
        height: 25px; /* Adjust size as needed */
        box-sizing: border-box;
        transform: translate(-50%, -50%); /* Ensures the bracket is centered on the coordinates */
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
</style>
