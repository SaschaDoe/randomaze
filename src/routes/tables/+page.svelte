<script>
    import {AllTables} from "$lib/tables/AllTables.ts";
    import Table from "./Table.svelte";
    import SideIndex from "./SideIndex.svelte";

</script>
<svelte:head>
    <title>Tables</title>
    <meta name="description" content="All random tables" />
</svelte:head>

<div class="main-container">
    <SideIndex {AllTables}></SideIndex>

    <div class="tables-container">
        <h1>All Tables</h1>
        {#each AllTables as category}
            <h2 id="{category.name}">{category.name}</h2>
            {#each category.tables as table}
                <Table {table}></Table>
            {/each}
        {/each}
    </div>
</div>

<style>
    .main-container {
        display: flex;
        align-items: start; /* aligns items to start of the main axis */
        justify-content: space-between; /* provides space between flex items */
        gap: 1rem; /* provides gap between flex items */

    }

    .tables-container {
        flex-basis: 80%; /* sets initial size of the tables-container */
    }
</style>