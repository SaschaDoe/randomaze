<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import CanvasHexmapRenderer from "./rendering/canvasMapRenderer";
    import {FullWorldMap} from "./domain/fullWorldMap";
    import {TerrainType} from "./domain/terrainType";
    import {ImageDefinition} from "./rendering/imageDefinition";
    import {CompressedWorldMap} from "./domain/compressedWorldMap";
    import {WorldElement} from "./domain/worldElement";

    let canvas: HTMLCanvasElement;
    let width: number;
    let height: number;
    let rows = 1000;
    let columns = 700;
    let mouseMoveHandler;
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

    });

    // Cleaning up
    onDestroy(() => {
        if(canvas){
            canvas.removeEventListener('mousemove', mouseMoveHandler);
        }
    });
    function toggleOriginal() {
        showOriginalPart = !showOriginalPart;
        if(showOriginalPart){
            showOriginal();

        } else {
            canvas.width = width / compressFactor +100;
            canvas.height = height / compressFactor +100;
            renderer.drawHexMapFrom(compressedWorldMap.elements.flat(), images)
        }
    }

    function showOriginal(){
        let partOfMap = fullWorldMap.elements.slice(y, 100+y).map((row, rowIndex) =>
            row.slice(x, 70+x).map((element, columnIndex) =>
                new WorldElement()
                    .withTerrainType(element.terrainType)
                    .withLocation(columnIndex,rowIndex)
            )
        );

        renderer.drawHexMapFrom(partOfMap.flat(), images)
    }

    let x = 0;
    let y = 0;
    let fastness = 1;
    function right() {
        x += fastness;
        showOriginal();
    }
    function left() {
        x -= fastness;
        showOriginal();
    }
    function up() {
        y -= fastness;
        showOriginal();
    }
    function down() {
        y += fastness;
        showOriginal();
    }
    function faster() {
        fastness = fastness + 10;
        showOriginal();
    }


</script>
<button on:click={toggleOriginal}>Show original part</button>
<button on:click={right}>&#8594;</button> <!-- Rightwards Arrow -->
<button on:click={left}>&#8592;</button> <!-- Leftwards Arrow -->
<button on:click={up}>&#8593;</button> <!-- Upwards Arrow -->
<button on:click={down}>&#8595;</button> <!-- Downwards Arrow -->
<button on:click={faster}>faster</button> <!-- Downwards Arrow -->
<canvas class="map" bind:this={canvas} {width} {height}></canvas>

<style>
    .map {
        transform: scale(0.2);
        transform-origin: top left;
        margin-top: 15px;
        background-color: black;
    }
</style>
