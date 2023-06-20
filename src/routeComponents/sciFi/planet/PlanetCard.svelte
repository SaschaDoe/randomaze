<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';

    let container;
    let selectedPlanet = 'desert'; // Default planet type

    // Base colors for each planet type
    const baseColors = {
        desert: { r: 210, g: 180, b: 140 },
        jungle: { r: 34, g: 139, b: 34 },
        ice: { r: 240, g: 248, b: 255 },
        water: { r: 0, g: 0, b: 255 }
    };

    let scene;
    let camera;
    let renderer;
    let planet;

    // Variables for controlling noise and brightness
    let noiseScale = 2;
    let brightness = 0.5;
    let resolution = 64;

    function createPlanet() {
        const geometry = new THREE.SphereGeometry(1, resolution, resolution);
        const noise = new ImprovedNoise();
        const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const pixelIndex = (i + j * resolution) * 4;
                const noiseValue = (noise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + noise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2; // Wrap-around effect
                const color = baseColors[selectedPlanet];
                texture.image.data[pixelIndex] = color.r * noiseValue * brightness;
                texture.image.data[pixelIndex + 1] = color.g * noiseValue * brightness;
                texture.image.data[pixelIndex + 2] = color.b * noiseValue * brightness;
                texture.image.data[pixelIndex + 3] = 255;
            }
        }

        texture.needsUpdate = true;
        planet = new THREE.Mesh(geometry, material);
        scene.add(planet);
    }

    onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        camera.position.z = 3;

        createPlanet();

        const animate = function () {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.01; // Adjust the rotation speed as desired
            renderer.render(scene, camera);
        };

        animate();
    });

    function handleChangePlanet(event) {
        selectedPlanet = event.target.value;
        scene.remove(planet);
        createPlanet();
    }

    function handleUpdate(event) {
        const { name, value } = event.target;
        switch(name) {
            case 'noiseScale':
                noiseScale = parseFloat(value);
                break;
            case 'brightness':
                brightness = parseFloat(value);
                break;
            case 'resolution':
                resolution = parseInt(value);
                break;
        }
        scene.remove(planet);
        createPlanet();
    }
</script>

<select bind:value={selectedPlanet} on:change={handleChangePlanet}>
    <option value="desert">Desert</option>
    <option value="jungle">Jungle</option>
    <option value="ice">Ice</option>
    <option value="water">Water</option>
</select>
<div id="controls">
    <label>
        Noise Scale:
        <input type="number" step="1" min="1" max="20" name="noiseScale" value={noiseScale} on:input={handleUpdate} />
    </label>
    <label>
        Brightness:
        <input type="number" step="0.1" min="0.1" max="1" name="brightness" value={brightness} on:input={handleUpdate} />
    </label>
    <label>
        Resolution:
        <input type="number" step="1" min="8" max="64" name="resolution" value={resolution} on:input={handleUpdate} />
    </label>
</div>
<div id="container" bind:this={container}></div>

<style>
    #container {
        width: 400px;
        height: 400px;
        position: relative;
        margin: 0 auto;
    }

    select, #controls {
        position: absolute;
        z-index: 2;
        margin: 10px;
    }

    #controls {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 20px;
    }

    #controls label {
        display: flex;
        gap: 5px;
    }
</style>
