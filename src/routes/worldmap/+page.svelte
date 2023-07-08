<script lang="ts">
    import { onMount } from 'svelte';
    import {FullWorldMap} from "./hex/fullWorldMap";
    import {WorldMapCanvas} from "./hex/worldMapCanvas";

    let canvas: HTMLCanvasElement;
    let worldMap = new FullWorldMap().withWidth(100).withHeight(100); // Adjust according to your requirements
    worldMap.generate();

    onMount(() => {
        WorldMapCanvas.drawMap(canvas, worldMap);
    });
</script>

<canvas bind:this={canvas} width="1000" height="1000"></canvas>