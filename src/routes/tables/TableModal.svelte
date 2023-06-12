<script>
    export let result;
    export let table;
    export let roll;
    let showDetails = false;
</script>

<div class="table-modal">
    <p class="result-string">Result: {result.string}</p>
    <button on:click={roll} class="roll-again-button">Roll Again</button>
    <button on:click={() => showDetails = !showDetails} class="show-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
    </button>
    {#if showDetails}
        <div class="roll-details">
            {#each result.rolls as rolled, i}
                <p><strong>{rolled.table.title}</strong>: {rolled.getRolledIndex()} {rolled.entry.displayedText}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    .table-modal {
        position: fixed;
        bottom: 20%;
        left: 20%;
        width: 50%;
        height: 50%;
        background-color: white;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 1rem black;
        max-height: 450px;
        min-height: 300px;
    }

    .table-modal .result-string {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .table-modal .roll-again-button, .table-modal .show-details-button {
        position: absolute;
        bottom: 10px;
        padding: 6px 12px; /* Adjust the padding to make the buttons smaller */
        font-size: 0.9rem; /* Adjust the font size to make the buttons smaller */
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
    }

    .table-modal .roll-again-button {
        left: 30%;
        transform: translateX(-50%);
    }

    .table-modal .show-details-button {
        right: 30%;
        transform: translateX(50%);
    }

    .table-modal .roll-details {
        margin-top: 1rem;
        border-top: 1px solid #ddd;
        padding-top: 1rem;
        overflow-y: auto;
        height: 200px;

    }
</style>
