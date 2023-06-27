<script>
    import { HexMapCreator } from "$lib/entities/worldmap/HexMapCreator.ts";
    import { Planet } from "$lib/entities/celestialBody/Planet.ts";
    import {Dice} from "$lib/tables/Dice.ts";

    let planet = new Planet();
    let size = 100;
    let noiseScale = HexMapCreator.DEFAULT_NOISE_SCALE;
    let elevationScale = HexMapCreator.DEFAULT_ELEVATION_SCALE;
    let worldMap;

    function generateWorldMap() {
        worldMap = HexMapCreator.create(planet, new Dice(), size, size, noiseScale, elevationScale);
    }

    generateWorldMap();

    function getTerrainColor(terrainType) {
        switch (terrainType) {
            case 0:
            case 1:
            case 2:
                return 'blue';
            case 3:
                return 'green';
            case 4:
                return 'maroon';
            case 5:
                return 'grey';
            default:
                return 'beige';
        }
    }

    function handleChange() {
        generateWorldMap();
    }
</script>



<h2>Worldmap Seed: {worldMap?.seed}</h2>
<div>
    <label>Noise Scale: ({noiseScale}) <input type="range" bind:value={noiseScale} min="0.1" max="10" step="0.1" on:change={handleChange} /></label>
    <label>Elevation Scale: ({elevationScale}) <input type="range" bind:value={elevationScale} min="1" max="20" step="1" on:change={handleChange} /></label>
</div>
<div id="grid">
    {#if !worldMap}
        <p>No world map loaded</p>
    {/if}

    <div class="rows-container">
        {#each worldMap?.hex?.grid as row, i}
            <div class="row" style="transform: translateX({i % 2 === 0 ? '0px' : '15px'})">
                {#each row as cell, j}
                    <div class="hexagon" style="background: {getTerrainColor(cell.terrainType)}">
                        <span class="terrain-type">{cell.terrainType}</span>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
<style>
    #grid {
        padding: 10px;
        width: 100%;
        margin: auto;
        font-size: 15px;
        font-family: Arial, sans-serif;
        color: #333;
    }

    .rows-container {
        overflow-x: auto;
        white-space: nowrap;
        max-height: 600px;  /* Set this to the desired maximum height of your hex map */
    }

    .row {
        width: max-content;
    }

    .hexagon {
        background: green; /*url('/hexagon.png') no-repeat;*/
        background-size: contain;
        width: 30px; /* = side length * 2 */
        height: 30px; /* = side length * sqrt(3) */
        margin: 1px;
        float: left;
        text-align: center;
        line-height: 30px; /* = height */
    }

    .terrain-type {
        color: white;
    }
</style>
