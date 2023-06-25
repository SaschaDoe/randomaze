<script>
    export let entity = null;

</script>

<div class="scrollable">
    <div class="entity-details">
        {#each entity.moons as moon}
            <div class="entity-field">
                <div class="field-name">Name</div>
                <div class="field-value">{moon.name}</div>
            </div>
            {#if moon.transliteration}

                {/if}

            <div class="entity-field">
                <div class="field-name">Size</div>
                <div class="field-value">{moon.size}</div>
            </div>
            <div class="entity-field">
                <div class="field-name">Distance from Planet</div>
                <div class="field-value">{moon.distance}</div>
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