<script>
    import { tick } from 'svelte';

    const numSquares = 30; // Width of the "planet"
    const numLayers = 28; // Height of the "planet"
    const radius = Math.min(numSquares, numLayers) / 2;
    let activeSquare = -1;
    let brightness = 1;
    let activeBrightness = 1;
    let baseColor = 'desert';
    let planet = [];

    function randomNoise() {
        return 0.2 * (Math.random() - 0.5);
    }

    function calculateBrightness(i, j, active = false) {
        const midLayer = numLayers / 2;
        const midSquare = numSquares / 2;
        const distLayer = Math.abs(j - midLayer) / radius;
        const distSquare = Math.abs(i - midSquare) / radius;
        const dist = Math.sqrt(distLayer * distLayer + distSquare * distSquare);
        if (dist > 1) {
            return 'black';
        }
        const brightnessScale = Math.sqrt(1 - dist * dist) + randomNoise();
        return `rgba(${getBaseColorValue(baseColor, active)}, ${brightness * brightnessScale * (active ? activeBrightness : 1)})`;
    }

    function getBaseColorValue(color, active = false) {
        switch (color) {
            case 'desert':
                return active ? '255, 255, 255' : '210, 180, 140';
            case 'jungle':
                return active ? '255, 255, 255' : '34, 139, 34';
            case 'ice':
                return active ? '255, 255, 255' : '135, 206, 235';
            case 'mars':
                return active ? '255, 255, 255' : '244, 164, 96';
            default:
                return '128, 128, 128';
        }
    }

    // Update the colors of the squares
    function updatePlanet() {
        planet = Array.from({ length: numLayers }, (_, j) =>
            Array.from({ length: numSquares }, (_, i) =>
                calculateBrightness(i, j))
        );
    }

    // Animate the squares
    async function animatePlanet() {
        for (let i = 0; i < numSquares; i++) {
            activeSquare = i;
            await tick();
            await new Promise(r => setTimeout(r, 500));
        }
        activeSquare = -1;
    }

    // Initialize the planet
    updatePlanet();
</script>

<button on:click={animatePlanet}>Start Animation</button>

<label for="brightness">Planet Brightness:</label>
<input type="range" id="brightness" min="0" max="1" step="0.1" bind:value={brightness} on:input={updatePlanet}>

<label for="activeBrightness">Active Pixel Brightness:</label>
<input type="range" id="activeBrightness" min="0" max="1" step="0.1" bind:value={activeBrightness}>

<label for="baseColor">Base Color:</label>
<select id="baseColor" bind:value={baseColor} on:change={updatePlanet}>
    <option value="desert">Desert Planet</option>
    <option value="jungle">Jungle Planet</option>
    <option value="ice">Ice Planet</option>
    <option value="mars">Mars-like Planet</option>
</select>

<div class="planet">
    {#each planet as layer, j (j)}
        <div class="layer">
            {#each layer as color, i (i)}
                <div style="width: 10px; height: 10px; background-color: {j === Math.floor(numLayers / 2) && i === activeSquare ? calculateBrightness(i, j, true) : color};"></div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .planet {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: black;
        width: 300px;
        height: 300px;
    }
    .layer {
        display: flex;
        gap: 0px;
    }
    button, label, input, select {
        display: block;
        margin: 10px auto;
    }
</style>
