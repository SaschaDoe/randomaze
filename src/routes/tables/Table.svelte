<script>
    export let table;
</script>

<table>
    <caption>{table.name}</caption>
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

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        font-family: Arial, sans-serif;
    }

    caption {
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
</style>