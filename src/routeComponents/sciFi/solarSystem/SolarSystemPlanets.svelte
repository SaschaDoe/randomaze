<script>
    export let entity;

    $: noSystem = entity.planets.length < 1;
</script>

<div class="entity-details">
    <div class="systems-list">
        <p>{entity.planets.length}</p>

        <ul>
            {#if noSystem}
                <p>No systems found</p>
            {/if}
            {#each entity.planets as planet}
                <li class="entity-field">
                    <button class="field-name">{planet.id}: {planet.nameTranslation} {planet.nameMeaning}</button>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .entity-details {
        display: grid;
        gap: 15px;
        color: lawngreen;
        margin-top: 10px;
        overflow: hidden;
    }

    .entity-field:hover .field-name,
    .entity-field.selected .field-name {
        background: lawngreen;
        color: black;
    }
    .systems-list {
        max-height: 300px; /* Adjust this value as needed */
        overflow-y: auto;
    }

    .systems-list ul {
        list-style-type: none;
        padding: 0; /* Optional: remove default padding */
    }

    .systems-list::-webkit-scrollbar {
        width: 10px;
    }

    .systems-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .systems-list::-webkit-scrollbar-thumb {
        background: lawngreen;
        border-radius: 5px;
    }

    .systems-list::-webkit-scrollbar-thumb:hover {
        background: darkgreen;
    }

    .entity-field:hover {
        background: rgba(0, 0, 0, 0.9); /* Slightly less transparent on hover */
    }

    .field-name {
        background: none;
        color: lawngreen;
        font-size: 1em;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
        width: 100%;
        border: none;
    }

    .field-name:hover {
        background: lawngreen;
        color: black;
    }

    .field-name:disabled {
        color: gray;
        border-color: gray;
        cursor: not-allowed;
    }


</style>
