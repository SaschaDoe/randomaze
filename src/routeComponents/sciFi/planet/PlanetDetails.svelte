<script>
    export let entity;

    function getFields() {
        if(entity && entity.nameTranslation !== "-"){
            return [
                { name: "name", value: entity.name },
                { name: "nameTranslation", value: entity.nameTranslation },
                { name: "nameMeaning", value: entity.nameMeaning },
                { name: "type", value: entity.type },
                { name: "size", value: entity.size },
            ];
        } else if (entity) {
            return [
                { name: "name", value: entity.name },
                { name: "type", value: entity.type },
                { name: "size", value: entity.size },
            ];
        }
        return [];
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
