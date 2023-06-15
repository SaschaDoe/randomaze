<script>
    import GalaxyDetails from "./GalaxyDetails.svelte";
    import GalaxyAnomalies from "./GalaxyAnomalies.svelte";
    import GalaxyAddSystem from "./GalaxyAddSystem.svelte";
    import SciFiCard from "../SciFiCard.svelte";
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
    .galaxy-name-id {
        font-size: 1.2em;
        margin-bottom: 10px;
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
