<script>
    export let entity;

    function getFields() {
        let details = [{name: "name", value: entity.name}];
        if (entity.nameTranslation !== "-") {
            details.push({name: "translation", value: entity.nameTranslation});
            details.push({name: "meaning", value: entity.nameMeaning},);
        }
        details.push({name: "type", value: entity.type});
        details.push({name: "size", value: entity.size});
        details.push({name: "atmosphere", value: entity.atmosphere});
        details.push({name: "weather", value: entity.weather});
        details.push({name: "obliquity", value: entity.obliquity.toFixed(5) + "°"});
        details.push({name: "moons", value: entity.moons.length});
        if(entity.rings.length > 0){
            details.push({name: "ring", value: entity.ringColorName});
        }


        return details;
    }

    $: fields = getFields();
</script>

<div class="scrollable">
<div class="entity-details">
    {#each fields as field (field.name)}
        <div class="entity-field">
            <div class="field-name">{field.name}</div>
            <div class="field-value">{field.value}</div>
        </div>
    {/each}
</div>
</div>

<style>
    .entity-details {
        display: grid;
        gap: 15px;
        color: lawngreen;
        margin-top: 10px;
        overflow: auto;
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

    .scrollable{
        overflow: auto;
        height: 100vh;
    }

    .scrollable::-webkit-scrollbar {
        width: 10px;
    }

    .scrollable::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .scrollable::-webkit-scrollbar-thumb {
        background: lawngreen;
        border-radius: 5px;
    }

    .scrollable::-webkit-scrollbar-thumb:hover {
        background: darkgreen;
    }
</style>
