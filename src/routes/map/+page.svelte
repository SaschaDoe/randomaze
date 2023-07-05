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
    let baseTemperature = 2;
    let temperatureVariance = 5;
    let desertFrequency = 200;

    $: { radius; width; height; continentalFrequency;  baseLevel;
       islandWeight; randomIslandWeight; baseTemperature; temperatureVariance;
       desertFrequency; generateTerrain(width,height); renderTerrain(); }

    let mapCreator = new MapCreator()
        .WithContinentalFrequency(continentalFrequency)
        .WithBaseLevel(baseLevel)
        .WithIslandWeight(islandWeight)
        .WithRandomIslandWeight(randomIslandWeight)
        .WithBaseTemperature(baseTemperature)
        .WithTemperatureVariance(temperatureVariance);


    function generateTerrain(width, height) {
        mapCreator = new MapCreator()
            .WithContinentalFrequency(continentalFrequency)
            .WithBaseLevel(baseLevel)
            .WithIslandWeight(islandWeight)
            .WithRandomIslandWeight(randomIslandWeight)
            .WithBaseTemperature(baseTemperature)
            .WithTemperatureVariance(temperatureVariance);

        let terrainHexes = mapCreator.generateTerrain(width, height);
        console.log("generate terrain with baseTemperature: " + baseTemperature);
        // convert HexField instances to format expected by d3-hexbin
        return terrainHexes.map(hex => [hex.x, hex.y, hex.h, hex.temperature, hex.terrainType]);
    }

    function getColor(terrainType) {
        switch (terrainType) {
            case TerrainType.Water:
                return 'blue';
            case TerrainType.Grass:
                return 'green';
            case TerrainType.Hills:
                return 'brown';
            case TerrainType.Mountain:
                return 'grey';
            case TerrainType.Snow:
                return 'white';
            case TerrainType.Desert:
                return 'yellow';
            case TerrainType.Tundra:
                return 'lightgrey';
            case TerrainType.Djungle:
                return 'darkgreen';
            case TerrainType.Plains:
                return '#a0a237';
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
        const format = d3Format(".1f");  // Display 2 decimal places
/*
        select(gElement)
            .selectAll(".hexagon")
            .data(hexData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => getColor(d[0][4]))
            .style("stroke", "black");
*/
        select(gElement)
            .selectAll(".hexagon")
            .data(hexData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => getColor(d[0][4]))
            .style("stroke", "black")
            .on("mouseover", function(event, d) {
                select(this)
                    .append("title")
                    .text(`Temp: ${format(d[0][3])} \n Height: ${format(d[0][2])} \n Terrain: ${TerrainType[d[0][4]]} `);
            })

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
    <div class="control">
        <label htmlFor="baseTemperature">Base temperature: </label>
        <input id="baseTemperature" type="range" bind:value={baseTemperature} min="-35" max="30" step="1"/>
        <span>{baseTemperature}</span>
    </div>
    <div class="control">
        <label htmlFor="temperatureVariance">Temperature variance: </label>
        <input id="temperatureVariance" type="range" bind:value={temperatureVariance} min="0" max="20" step="1"/>
        <span>{temperatureVariance}</span>
    </div>
    <div class="control">
        <label htmlFor="desertFrequency">Desert frequency: </label>
        <input id="desertFrequency" type="range" bind:value={desertFrequency} min="50" max="400" step="50"/>
        <span>{desertFrequency}</span>
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
