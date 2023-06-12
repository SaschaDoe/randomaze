<script>
    import {AllTables} from "$lib/tables/AllTables.ts";
    import Table from "./Table.svelte";
    import SideIndex from "./SideIndex.svelte";

</script>
<svelte:head>
    <title>Tables</title>
    <meta name="description" content="All random tables" />
</svelte:head>

<SideIndex {AllTables}></SideIndex>

<h1>All Tables</h1>
{#each AllTables as category}
    <h2 id="{category.name}">{category.name}</h2>
    {#each category.tables as table}
        <Table {table}></Table>
        {/each}
{/each}
