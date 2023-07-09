<script>
    import {onMount} from 'svelte';
    import {hexbin as d3Hexbin} from 'd3-hexbin';
    import {format as d3Format, select, zoomIdentity, zoom } from 'd3';
    import {MapCreator} from "./mapCreator.ts";
    import {TerrainType} from "../hexmap/terrainType.ts";
    import {
        DesertPlanet,
        EarthLikePlanet,
        IcePlanet,
        JunglePlanet,
        LavaPlanet,
        OceanPlanet,
        RockyPlanet
    } from "./Planet.ts";
    import {getColor} from "./ColorPalettes.ts";
    import * as d3Array from "d3-array";
    import {TerrainCompressor} from "./TerrainCompressor.ts";

    let terrain;
    let radius = 4;
    //let height = 1500;
    //let width = 2700;

    let continentalFrequency = 300;
    let baseLevel = 0.25;
    let islandWeight = 2;
    let randomIslandWeight = 0.008;
    let baseTemperature = 2;
    let temperatureVariance = 5;
    let desertFrequency = 200;
    let waterLevel = 0.4;
    let baseDryness = 0;
    let variance = 0;
    let colorPalette = 'earthy';  // 'earthy' or 'custom'
    $: currentPlanetType = 'earthlike';

    $: { radius; width; height; continentalFrequency;  baseLevel; waterLevel;
       islandWeight; randomIslandWeight; baseTemperature; temperatureVariance;
       desertFrequency; baseDryness; generateTerrain(width,height); renderTerrain(); }

    let mapCreator = new MapCreator();



    function generateOceanPlanet() {
        let oceanPlanet = new OceanPlanet(variance);
        baseDryness = oceanPlanet.baseDryness;
        waterLevel = oceanPlanet.waterLevel;
        baseLevel = oceanPlanet.baseLevel;
        baseTemperature = oceanPlanet.baseTemperature;
        desertFrequency = oceanPlanet.desertFrequency;
        continentalFrequency = oceanPlanet.continentalFrequency;
        islandWeight = oceanPlanet.islandWeight;
        randomIslandWeight = oceanPlanet.randomIslandWeight;
        currentPlanetType = oceanPlanet.currentPlanetType;
        rerender();
    }

    function generateEarthLikePlanet() {
        let earthlikePlanet = new EarthLikePlanet(variance);
        baseDryness = earthlikePlanet.baseDryness;
        waterLevel = earthlikePlanet.waterLevel;
        baseLevel = earthlikePlanet.baseLevel;
        baseTemperature = earthlikePlanet.baseTemperature;
        desertFrequency = earthlikePlanet.desertFrequency;
        continentalFrequency = earthlikePlanet.continentalFrequency;
        islandWeight = earthlikePlanet.islandWeight;
        randomIslandWeight = earthlikePlanet.randomIslandWeight;
        currentPlanetType = earthlikePlanet.currentPlanetType;
        rerender();
    }

    function generateDesertPlanet() {
        let desertPlanet = new DesertPlanet(variance);
        baseDryness = desertPlanet.baseDryness;
        waterLevel = desertPlanet.waterLevel;
        baseLevel = desertPlanet.baseLevel;
        baseTemperature = desertPlanet.baseTemperature;
        desertFrequency = desertPlanet.desertFrequency;
        continentalFrequency = desertPlanet.continentalFrequency;
        islandWeight = desertPlanet.islandWeight;
        randomIslandWeight = desertPlanet.randomIslandWeight;
        currentPlanetType = desertPlanet.currentPlanetType;
        rerender();
    }

    function generateIcePlanet() {
        let icePlanet = new IcePlanet(variance);
        baseDryness = icePlanet.baseDryness;
        waterLevel = icePlanet.waterLevel;
        baseLevel = icePlanet.baseLevel;
        baseTemperature = icePlanet.baseTemperature;
        desertFrequency = icePlanet.desertFrequency;
        continentalFrequency = icePlanet.continentalFrequency;
        islandWeight = icePlanet.islandWeight;
        randomIslandWeight = icePlanet.randomIslandWeight;
        currentPlanetType = icePlanet.currentPlanetType;
        rerender();
    }

    function generateJunglePlanet() {
        let junglePlanet = new JunglePlanet(variance);
        baseDryness = junglePlanet.baseDryness;
        waterLevel = junglePlanet.waterLevel;
        baseLevel = junglePlanet.baseLevel;
        baseTemperature = junglePlanet.baseTemperature;
        desertFrequency = junglePlanet.desertFrequency;
        continentalFrequency = junglePlanet.continentalFrequency;
        islandWeight = junglePlanet.islandWeight;
        randomIslandWeight = junglePlanet.randomIslandWeight;
        currentPlanetType = junglePlanet.currentPlanetType;
        rerender();
    }

    function generateLavaPlanet() {
        let lavaPlanet = new LavaPlanet(variance);
        baseDryness = lavaPlanet.baseDryness;
        waterLevel = lavaPlanet.waterLevel;
        baseLevel = lavaPlanet.baseLevel;
        baseTemperature = lavaPlanet.baseTemperature;
        desertFrequency = lavaPlanet.desertFrequency;
        continentalFrequency = lavaPlanet.continentalFrequency;
        islandWeight = lavaPlanet.islandWeight;
        randomIslandWeight = lavaPlanet.randomIslandWeight;
        currentPlanetType = lavaPlanet.currentPlanetType;
        rerender();
    }

    function generateRockyPlanet() {
        let rockyPlanet = new RockyPlanet(variance);
        baseDryness = rockyPlanet.baseDryness;
        waterLevel = rockyPlanet.waterLevel;
        baseLevel = rockyPlanet.baseLevel;
        baseTemperature = rockyPlanet.baseTemperature;
        desertFrequency = rockyPlanet.desertFrequency;
        continentalFrequency = rockyPlanet.continentalFrequency;
        islandWeight = rockyPlanet.islandWeight;
        randomIslandWeight = rockyPlanet.randomIslandWeight;
        currentPlanetType = rockyPlanet.currentPlanetType;
        rerender();
    }

    function generatePlanet(event) {
        switch(event.target.value) {
            case "EarthLikePlanet":
                generateEarthLikePlanet();
                break;
            case "OceanPlanet":
                generateOceanPlanet();
                break;
            case "DesertPlanet":
                generateDesertPlanet();
                break;
            case "IcePlanet":
                generateIcePlanet();
                break;
            case "JunglePlanet":
                generateJunglePlanet();
                break;
            case "LavaPlanet":
                generateLavaPlanet();
                break;
            case "RockyPlanet":
                generateRockyPlanet();
                break;
            default:
                console.log("Please select a planet type.");
        }
    }


    function switchColorPalette() {
        colorPalette = colorPalette === 'earthy' ? 'custom' : 'earthy';
        renderTerrain();
    }

    let svgElement, gElement;

    function generateTerrain(width, height) {
        mapCreator = new MapCreator()
            .WithContinentalFrequency(continentalFrequency)
            .WithBaseLevel(baseLevel)
            .WithIslandWeight(islandWeight)
            .WithRandomIslandWeight(randomIslandWeight)
            .WithBaseTemperature(baseTemperature)
            .WithTemperatureVariance(temperatureVariance)
            .WithWaterLevel(waterLevel)
            .WithDesertFrequency(desertFrequency)
            .WithBaseDryness(baseDryness);
        console.log("Generating full terrain...");
        let allTerrainHexes = mapCreator.generateTerrain(width, height);
        console.log("Compress terrain...");
        //allTerrainHexes = new TerrainCompressor().compress(allTerrainHexes, 2);
        console.log("map terrain...");
        return allTerrainHexes.map(hex => [hex.x, hex.y, 0, 0, hex.terrainType, 0]);
        //return allTerrainHexes.map(hex => [hex.x, hex.y, hex.h, hex.temperature, hex.terrainType, hex.dryness]);
    }

    let height = 1300;
    let width = 2500;
    let myZoom;
    function renderTerrain() {
        console.log("Rendering terrain...");
        if (!terrain) terrain = generateTerrain(width, height);
        // clear the previous terrain
        select(gElement).selectAll(".hexagon").remove();
        select(gElement).selectAll(".hexText").remove();

        let hexbin = d3Hexbin().radius(radius);
        let hexData = hexbin(terrain);
        const format = d3Format(".1f");

        select(gElement)
            .selectAll(".hexagon")
            .data(hexData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => getColor(d[0][4], colorPalette))
            .style("stroke", "black")
            .on("mouseover", function(event, d) {
                select(this)
                    .append("title")
                    .text(`Height: ${format(d[0][2])} \n Temp: ${format(d[0][3])} \n Dryness: ${format(d[0][5])} \n Terrain: ${TerrainType[d[0][4]]} `);
            })
            .on("click", function(event, d) {
                alert(`Height: ${format(d[0][2])} \n Temp: ${format(d[0][3])} \n Dryness: ${format(d[0][5])} \n Terrain: ${TerrainType[d[0][4]]}`);
                console.log(event);
            })

        myZoom = zoom()
            .scaleExtent([0.1, 5])
            .on('zoom', (event) => {
                select(gElement).attr('transform', event.transform);
            });

        select(svgElement).call(myZoom);
        console.log("Rendering terrain completed");
    }

    function zoomOut() {
        select(svgElement).transition().duration(1).call(myZoom.transform, zoomIdentity.scale(0.5));
    }

    function zoomIn(){
        select(svgElement).transition().duration(1).call(myZoom.transform, zoomIdentity.scale(7));
    }


    function rerender() {
        terrain = null;  // reset the terrain
        renderTerrain();
    }

    onMount(renderTerrain);

    let showAdvanced = false;

    function toggleAdvancedOptions() {
        showAdvanced = !showAdvanced;
    }
</script>


<button on:click="{zoomOut}">Zoom Out</button>
<button on:click="{zoomIn}">Zoom In</button>
<div id="advanced-options" style="display: {showAdvanced ? 'block' : 'none'};">
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
                <label htmlFor="baseDryness">Base dryness: </label>
                <input id="baseDryness" type="range" bind:value={baseDryness} min="-1" max="1" step="0.1"/>
                <span>{baseDryness}</span>
            </div>
            <div class="control">
                <label htmlFor="desertFrequency">Desert frequency: </label>
                <input id="desertFrequency" type="range" bind:value={desertFrequency} min="50" max="400" step="50"/>
                <span>{desertFrequency}</span>
            </div>
            <div class="control">
                <label htmlFor="waterLevel">Water level: </label>
                <input id="waterLevel" type="range" bind:value={waterLevel} min="-1" max="1" step="0.1"/>
                <span>{waterLevel}</span>
            </div>
        </div>
    </div>

    <div class="button-container">
        <button on:click="{toggleAdvancedOptions}">{showAdvanced ? 'Hide Advanced Options ↑' : 'Show Advanced Options ↓'}</button>
    </div>


    <div class="button-container">
        <button on:click={rerender}>Re-render {currentPlanetType}</button>
        <button on:click={switchColorPalette}>Switch color current: {colorPalette}</button>
        <div class="control">
            <label htmlFor="variance">Variance: </label>
            <input id="variance" type="range" bind:value={variance} min="-1" max="50" step="1"/>
            <span>{variance}</span>
        </div>
    </div>
<div class="dropdown">
    <select id="planet-types" on:change={generatePlanet}>
        <option value="">-- select a planet type --</option>
        <option value="EarthLikePlanet">Earth-like Planet</option>
        <option value="OceanPlanet">Ocean Planet</option>
        <option value="DesertPlanet">Desert Planet</option>
        <option value="IcePlanet">Ice Planet</option>
        <option value="JunglePlanet">Jungle Planet</option>
        <option value="LavaPlanet">Lava Planet</option>
        <option value="RockyPlanet">Rocky Planet</option>
    </select>
</div>


    <div class="container">
        <svg bind:this={svgElement} width="100%" height="100%">
            <g bind:this={gElement}>
            </g>
        </svg>
    </div>



<style>
    .dropdown{
        margin-top: 5px;
        margin-bottom: 7px;
    }

    select{
        height: 25px;
    }
    .button-container{
        display: flex;
    }
    button{
        margin-right: 7px;
    }
    .container {
        width: 100%;
        height: 1000px;
    }
    .regler{
        margin-top: 30px;
    }

    #advanced-options {
        display: none; /* Start with the advanced options hidden */
    }

</style>
