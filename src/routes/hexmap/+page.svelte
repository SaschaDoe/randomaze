<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import CanvasHexmapRenderer, { Hex } from "./rendering/canvasMapRenderer";
    import {FullWorldMap} from "./domain/fullWorldMap";
    import {TerrainType} from "./domain/terrainType";

    let canvas: HTMLCanvasElement;
    let tooltip: HTMLElement;
    let width: number;
    let height: number;
    let tooltipText: string = '';
    const rows = 100;
    const columns = 60;
    let mouseMoveHandler;
    let hexes: Hex[] = [];
    const fullWorldMap = new FullWorldMap()
        .withWidth(columns)
        .withHeight(rows)
        .generate();




    onMount(async () => {
        if (typeof window === 'undefined') {
            console.log("no dom available");

        }

        const images = {
            [TerrainType.Water]: new Image(),
            [TerrainType.Grass]: new Image(),
            [TerrainType.Hills]: new Image(),
            [TerrainType.Mountain]: new Image(),
            [TerrainType.HighMountain]: new Image(),
        } as Record<TerrainType, HTMLImageElement>;

            images[TerrainType.Water].src = '/hextiles/water.png';
            images[TerrainType.Grass].src = '/hextiles/grass.png';
            images[TerrainType.Hills].src = '/hextiles/plain.png';
            images[TerrainType.Mountain].src = '/hextiles/mountain.png';
            images[TerrainType.HighMountain].src = '/hextiles/snow.png';


        const ctx = canvas.getContext('2d');
        const renderer = new CanvasHexmapRenderer(ctx);

        width = renderer.getCanvasWidth(columns);
        height = renderer.getCanvasHeight(rows);

        await Promise.all(Object.values(images).map(img => new Promise(resolve => {
            img.onload = resolve;
        })));

        hexes = renderer.drawHexMapFrom(fullWorldMap.elements, images);

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
</script>

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
