<script>
    export let galaxy;

    let fields = [
        { name: "Type", value: galaxy.type },
        { name: "Rotation Velocity", value: galaxy.rotationVelocity+" km/s" },
        { name: "Size", value: galaxy.size },
        { name: "Diameter", value: galaxy.sizeInLightyears+" lightyears" },
        { name: "Mass", value: galaxy.massInSolarMasses+" solar masses" },
        { name: "Active Nucleus", value: galaxy.hasActiveGalacticNucleus },
    ];
</script>

<div class="entity-details">
    {#each fields as field (field.name)}
        <div class="entity-field">
            <div class="field-name">{field.name}</div>
            <div class="field-value">{field.value}</div>
        </div>
    {/each}
</div>

<style>
    .entity-details {
        display: grid;
        gap: 15px;
        color: lawngreen;
        margin-top: 10px;
    }

    .entity-field {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid lawngreen;
        border-radius: 5px;
    }

    .field-name, .field-value {
        font-size: 0.9em;
    }

    .field-name {
        font-weight: bold;
    }
</style>
