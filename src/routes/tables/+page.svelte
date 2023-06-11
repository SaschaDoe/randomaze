<script>
    import {AllTables} from "$lib/tables/AllTables.ts";
    import Table from "./Table.svelte";

</script>
<svelte:head>
    <title>Tables</title>
    <meta name="description" content="All random tables" />
</svelte:head>

<h1>All Tables</h1>
{#each AllTables as category}
    <h2>{category.name}</h2>
    {#each category.tables as table}
        <Table {table}></Table>
        {/each}
{/each}
