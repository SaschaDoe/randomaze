<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import CanvasHexmapRenderer, { Hex } from "./rendering/canvasMapRenderer";
    import {FullWorldMap} from "./domain/fullWorldMap";
    import {TerrainType} from "./domain/terrainType";
    import {ImageDefinition} from "./rendering/imageDefinition";
    import {CompressedWorldMap} from "./domain/compressedWorldMap";

    let canvas: HTMLCanvasElement;
    let tooltip: HTMLElement;
    let width: number;
    let height: number;
    let tooltipText: string = '';
    let rows = 1000;
    let columns = 700;
    let mouseMoveHandler;
    let hexes: Hex[] = [];
    let showOriginalPart = false;
    let ctx: CanvasRenderingContext2D;
    let renderer: CanvasHexmapRenderer;
    let images: Record<TerrainType, HTMLImageElement>;
    let compressFactor = 10;
    let fullWorldMap = new FullWorldMap();
    let compressedWorldMap = new CompressedWorldMap();

        onMount(async () => {
        if (typeof window === 'undefined') {
            console.log("no dom available");
        }
        fullWorldMap = new FullWorldMap()
                .withWidth(columns)
                .withHeight(rows)
                .generate();
        compressedWorldMap = new CompressedWorldMap()
                .of(fullWorldMap)
                .withCompressFactor(compressFactor)
                .compress();

        images = ImageDefinition.get();

        ctx = canvas.getContext('2d');
        renderer = new CanvasHexmapRenderer(ctx);

        width = renderer.getCanvasWidth(columns);
        height = renderer.getCanvasHeight(rows);
        console.log(`width: ${width}, height: ${height}`);

        await Promise.all(Object.values(images).map(img => new Promise(resolve => {
            img.onload = resolve;
        })));

            canvas.width = width / compressFactor +100;
            canvas.height = height / compressFactor +100;
            renderer.drawHexMapFrom(compressedWorldMap.elements.flat(), images)

            mouseMoveHandler = function(event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const canvasX = (event.clientX - rect.left) * scaleX;
            const canvasY = (event.clientY - rect.top) * scaleY;

            // Find the hexagon under the mouse
            const hex = hexes.find(hex =>
                canvasX >= hex.x && canvasX <= hex.x + hex.width &&
                canvasY >= hex.y && canvasY <= hex.y + hex.height
            );

            // Display the coordinates in a tooltip
            if (hex) {
                tooltipText = `(${hex.id})`;
            } else {
                tooltipText = '';
            }

            tooltip.style.left = `${event.clientX}px`;
            tooltip.style.top = `${event.clientY}px`;
        };

        // Mouse move event
        canvas.addEventListener('mousemove', mouseMoveHandler);
    });

    // Cleaning up
    onDestroy(() => {
        if(canvas){
            canvas.removeEventListener('mousemove', mouseMoveHandler);
        }
    });
    function showOriginal() {
        showOriginalPart = !showOriginalPart;
        if(showOriginalPart){
            let partOfMap = fullWorldMap.elements.slice(0, 100).map(row => row.slice(0, 70));

            renderer.drawHexMapFrom(partOfMap.flat(), images)
        } else {
            canvas.width = width / compressFactor +100;
            canvas.height = height / compressFactor +100;
            renderer.drawHexMapFrom(compressedWorldMap.elements.flat(), images)
        }
    }

</script>
<button on:click={showOriginal}>Show original part</button>
<canvas class="map" bind:this={canvas} {width} {height}></canvas>
<div class="tooltip" bind:this={tooltip}>{tooltipText}</div>


<style>
    .map {
        transform: scale(0.2);
        transform-origin: top left;
        margin-top: 15px;
        background-color: black;
    }
    .tooltip {
        position: absolute;
        color: #fff;
        background-color: #333;
        padding: 10px;
        border-radius: 5px;
        pointer-events: none; /* To prevent the tooltip from interfering with mouse events */
    }
</style>
