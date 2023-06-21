<script>
    export let entity;

    function getFields() {
        return [
            { name: "name", value: entity.name },
            { name: "stage", value: entity.stage },
            { name: "size", value: entity.size },
            { name: "luminosity", value: entity.luminosity + "L⊙" },
            { name: "mass", value: entity.luminosity + "M☉" },
            { name: "surface temp", value: entity.luminosity + "K" },
    ];
    }

    $: fields = getFields();
</script>

<div class="entity-details">
    {#each fields as field (field.name)}
        <div class="entity-field">
            <div class="field-name">{field.name}</div>
            <div class="field-value">{field.value}</div>
        </div>
    {/each}
</div>

<!-- the rest of your code -->

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
