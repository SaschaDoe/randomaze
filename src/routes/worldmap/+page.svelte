<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import {FullWorldMap} from "../hexmap/fullWorldMap";
    import {WorldMapCanvas} from "./worldMapCanvas";
    import {TerrainType} from "../hexmap/terrainType.js";

    let worldMap = new FullWorldMap().withWidth(100).withHeight(100);
    worldMap.generate();
    let worldMapCanvas: WorldMapCanvas;
    let selectedElement = worldMap.elements[0];

    let mapWidth = 20;
    let mapHeight = 20;
    let hexSize = 20;

    let canvas: HTMLCanvasElement;

    function generateNewMap() {
        console.log("Generating new map with width " + mapWidth + " and height " + mapHeight + ".");
        worldMap = new FullWorldMap().withWidth(mapWidth).withHeight(mapHeight);
        worldMap.generate();
        console.log(worldMap);
        worldMapCanvas = new WorldMapCanvas().withBorder(true);
        console.log("canvas: ", canvas);
        worldMapCanvas.drawMapWithHexes(canvas, worldMap, hexSize);
        console.log("canvas after: ", canvas);
        return canvas;
    }

    onMount(() => {
        generateNewMap();
    });
    let scale = 1;
    const zoomFactor = 0.1;

    function zoom(event: WheelEvent) {
        event.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ctx = canvas.getContext('2d');

        // Adjust scale factor based on scroll direction
        if (event.deltaY < 0) {
            scale += zoomFactor;
        } else {
            scale -= zoomFactor;
        }

        // Limit the scale factor to a certain range, if necessary
        scale = Math.min(Math.max(.5, scale), 2);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Move the canvas context so that the mouse point comes at the origin
        ctx.translate(x, y);

        // Scale it
        ctx.scale(scale, scale);

        // Again move the canvas context back
        ctx.translate(-x, -y);

        // Then draw your map again
        worldMapCanvas.drawMapWithHexes(canvas, worldMap, hexSize);

        ctx.restore();
    }

    let handleClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ctx = canvas.getContext('2d');

        const hex = worldMapCanvas.getHexAtPoint(x, y, worldMap, hexSize);

        if (hex) {
            selectedElement = hex;
        }
    }

</script>


<div class="info-container">
    <p>X: {selectedElement.x}</p>
    <p>Y: {selectedElement.y}</p>
    <p>Height: {selectedElement.h}</p>
    <p>Terrain Type: {TerrainType[selectedElement.terrainType]}</p>
    <p>Dryness: {selectedElement.dryness}</p>
    <p>Temperature: {selectedElement.temperature}</p>
</div>

<div class="option-container">
    <label>
        Width:
        <input type="number" bind:value={mapWidth} min="1">
    </label>
    <label>
        Height:
        <input type="number" bind:value={mapHeight} min="1">
    </label>
    <label>
        Hex size:
        <input type="number" bind:value={hexSize} min="2">
    </label>
    <button on:click={generateNewMap}>Generate New Map</button>
</div>

<canvas bind:this={canvas} on:click={handleClick} on:wheel={zoom}></canvas>


<style>
    .info-container, .option-container {
        background-color: white;
        padding: 10px;
        border: 1px solid black;
        margin-bottom: 10px;
    }
    canvas{
        border: 1px solid black;
        background: black;
    }
</style>
