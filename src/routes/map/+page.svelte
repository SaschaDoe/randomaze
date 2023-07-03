<script>
    import {onMount} from 'svelte';
    import {hexbin as d3Hexbin} from 'd3-hexbin';
    import {format as d3Format, select, zoom as d3Zoom} from 'd3';
    import {MapCreator} from "./mapCreator.ts";
    import {TerrainType} from "./terrainType.ts";


    let radius = 5;
    let height = 600;
    let width = 1300;
    let continentalFrequency = 300;
    let baseLevel = 0.25;
    let islandWeight = 2;
    let randomIslandWeight = 0.008;

    $: { radius; width; height; continentalFrequency;  baseLevel;
       islandWeight; randomIslandWeight; renderTerrain(); }

    let mapCreator = new MapCreator();

    function generateTerrain(width, height) {
        let terrainHexes = mapCreator.generateTerrain(width, height);

        // convert HexField instances to format expected by d3-hexbin
        return terrainHexes.map(hex => [hex.x, hex.y, hex.h]);
    }



    // This function should be 0 on the edges (x=0 and x=width) and 1 in the middle
    // At the edges, the steepness should be high, and in the middle, it should be flat
    // The function should be symmetric around the middle

    function edgeFunction(x) {
        let result = Math.sin(Math.PI * x / 1000);
        return result;
    }

    function getColor(height) {
        let type = mapCreator.getTerrainType(height);
        switch (type) {
            case TerrainType.Water:
                return 'blue';
            case TerrainType.Grass:
                return 'green';
            case TerrainType.Plain:
                return 'brown';
            case TerrainType.Mountain:
                return 'grey';
            default:
                return 'white';
        }
    }


    let svgElement, gElement;

    function renderTerrain() {
        // clear the previous terrain
        select(gElement).selectAll(".hexagon").remove();
        select(gElement).selectAll(".hexText").remove();

        let terrain = generateTerrain(width, height);
        let hexbin = d3Hexbin().radius(radius);
        let hexData = hexbin(terrain);
        const format = d3Format(".2f");  // Display 2 decimal places

        select(gElement)
            .selectAll(".hexagon")
            .data(hexData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => getColor(d[0][2]))
            .style("stroke", "black");
/*
        select(gElement)
            .selectAll(".hexText")
            .data(hexData)
            .join('text')
            .attr("class", "hexText")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("text-anchor", "middle")
            .style("font-size", "8px") // Adjust font size to fit in the hexagon
            .style("fill", "black")
            .text(d => format(d[0][2]));
*/
        let zoom = d3Zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                select(gElement).attr('transform', event.transform);
            });

        select(svgElement).call(zoom);
    }


    function rerender() {
        renderTerrain();
    }

    onMount(renderTerrain);
</script>

<div class="regler">
    <div class="control">
        <label htmlFor="elevation">Continental weight: </label>
        <input id="elevation" type="range" bind:value={continentalFrequency} min="1" max="1000" step="50"/>
        <span>{continentalFrequency}</span>
    </div>
    <div class="control">
        <label htmlFor="baseLevel">Base Level: </label>
        <input id="baseLevel" type="range" bind:value={baseLevel} min="0" max="1" step="0.05"/>
        <span>{baseLevel}</span>
    </div>
    <div class="control">
        <label htmlFor="islandWeight">Island Weight: </label>
        <input id="islandWeight" type="range" bind:value={islandWeight} min="0.2" max="5" step="0.2"/>
        <span>{islandWeight}</span>
    </div>
    <div class="control">
        <label htmlFor="randomIslandWeight">Random Island Weight: </label>
        <input id="randomIslandWeight" type="range" bind:value={randomIslandWeight} min="0.0" max="0.09" step="0.001"/>
        <span>{randomIslandWeight}</span>
    </div>
    <button on:click={rerender}>Re-render</button>
</div>


<div class="container">
    <svg bind:this={svgElement} width="100%" height="100%">
        <g bind:this={gElement}>
        </g>
    </svg>
</div>

<style>
    .container {
        width: 100%;
        height: 1000px;
    }
    .regler{
        margin-top: 30px;
    }

</style>
