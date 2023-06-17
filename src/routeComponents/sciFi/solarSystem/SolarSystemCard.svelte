<script>
    import SolarSystemDetails from "./SolarSystemDetails.svelte";
    import SolarSystemPlanets from "./SolarSystemPlanets.svelte";
    import SolarSystemAnomalies from "./SolarSystemAnomalies.svelte";
    import SciFiCard from "../SciFiCard.svelte";

    export let solarSystem;

    let components = [
        { name: 'details', component: SolarSystemDetails },
        { name: 'planets', component: SolarSystemPlanets },
        { name: 'anomalies', component: SolarSystemAnomalies },
    ];
</script>


<SciFiCard entity={solarSystem} components={components} defaultTab="details">
    <div slot="image">
       <div>No image yet</div>
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
        object-fit: cover;
    }
    .solar-system-bracket {
        position: absolute;
        border: 2px solid gray;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        transform: translate(-50%, -50%);
    }

    .solar-system-bracket.selected {
        border-color: lawngreen; /* color for selected system */
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
