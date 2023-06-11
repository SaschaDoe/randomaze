<script>
    import Modal from "../Modal.svelte";

    export let table;
    let result = null;
    let showModal = false;

    function roll(){
        result = table.roll();
        showModal = true;
    }
</script>

<h1>{table.name}</h1>
<button on:click={roll}>Roll</button>

<table>
    <thead>
    <tr>
        <th>Index</th>
        <th>Title</th>
    </tr>
    </thead>
    <tbody>
    {#each table.entries as entry, i (entry.title)}
        <tr>
            <td>{i+1}</td>
            <td>{entry.title}</td>
        </tr>
    {/each}
    </tbody>
</table>

{#if showModal}
    <Modal on:close="{() => showModal = false}">
        <p><strong>Rolled:</strong> {table.entries.indexOf(result.entry) + 1}</p>
        <p><strong>Result:</strong> {result.entry.title}</p>
    </Modal>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        font-family: Arial, sans-serif;
    }

    h1 {
        font-size: 1.5em;
        margin: 0.5em 0;
        font-weight: bold;
        color: #333;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        color: black;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    button {
        display: block;
        margin-bottom: 10px;
        padding: 10px 20px;
        font-size: 1em;
        border: none;
        color: white;
        background-color: #333;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
</style>
