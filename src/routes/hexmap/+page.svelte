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
    let rows = 300;
    let columns = 180;
    let mouseMoveHandler;
    let hexes: Hex[] = [];
    let useCompressedMap = true;
    let ctx: CanvasRenderingContext2D;
    let renderer: CanvasHexmapRenderer;
    let images: Record<TerrainType, HTMLImageElement>;
    let compressFactor = 3;
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


        await Promise.all(Object.values(images).map(img => new Promise(resolve => {
            img.onload = resolve;
        })));

            if(useCompressedMap){
                canvas.width = width / compressFactor;
                canvas.height = height / compressFactor;

            }else{
                canvas.width = width;
                canvas.height = height;

            }
            hexes = useCompressedMap ?
                renderer.drawHexMapFrom(compressedWorldMap.elements.flat(), images) :
                renderer.drawHexMapFrom(fullWorldMap.elements.flat(), images);


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

    function switchMap() {
        // First, toggle the boolean
        useCompressedMap = !useCompressedMap;
/*
        // Update the size of the map
        columns = useCompressedMap ? 30 : 60;
        rows = useCompressedMap ? 50 : 100;

        // Update the canvas size
        width = renderer.getCanvasWidth(columns);
        height = renderer.getCanvasHeight(rows);

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
*/
        // Update the actual size of the canvas, not just the CSS size
        if(useCompressedMap){
            canvas.width = width / compressFactor;
            canvas.height = height / compressFactor;

        }else{
            canvas.width = width;
            canvas.height = height;

        }


        hexes = useCompressedMap ?
            renderer.drawHexMapFrom(compressedWorldMap.elements.flat(), images) :
            renderer.drawHexMapFrom(fullWorldMap.elements.flat(), images);


    }


</script>

<button on:click={switchMap}>Switch Map</button>
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
