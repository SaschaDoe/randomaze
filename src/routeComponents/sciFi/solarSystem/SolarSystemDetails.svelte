<script>
    export let entity;

    function getSizesString(){
        let stars = entity.stars;
        let sizesString = "";
        for(let i = 0; i < stars.length; i++){
            sizesString += (i+1)+ ": " + stars[i].size + "\n";
        }
        return sizesString;
    }

    let fields = [
        { name: "number of stars", value: entity.stars.length },
        { name: "sizes", value: getSizesString() },
        { name: "age", value: entity.age + " million years"},
        { name: "stage", value: entity.stage},
        { name: "", value: entity.stageDescription},
        { name: "number of planets", value: entity.planets.length },
        { name: "habitual zone", value: `${entity.habitableZoneStart} - ${entity.habitableZoneEnd}` },

    ];
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
