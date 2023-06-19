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
       <div>{solarSystem.id}: {solarSystem.name}</div>
    </div>
</SciFiCard>

