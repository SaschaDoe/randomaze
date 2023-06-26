<script>
    import {WorldMapCreator} from "$lib/entities/worldmap/WorldMapCreator.ts";
    import {Planet} from "$lib/entities/celestialBody/Planet.ts";

    let planet = new Planet();
    let worldMap = WorldMapCreator.create(planet);
</script>

<h2>Worldmap Seed: {worldMap.seed}</h2>

<table>
    {#if !worldMap}
        <p>No world map loaded</p>
    {/if}

    {#each worldMap.map as row, i}
        <tr>
            {#each row as cell, j}
                <td>{cell}</td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    table {
        border-collapse: collapse;
    }

    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
</style>
