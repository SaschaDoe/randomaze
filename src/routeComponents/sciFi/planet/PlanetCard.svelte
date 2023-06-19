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

    function createPlanet() {
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const noise = new ImprovedNoise();
        const texture = new THREE.DataTexture(new Uint8Array(64 * 64 * 4), 64, 64, THREE.RGBAFormat);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        for (let i = 0; i < 64; i++) {
            for (let j = 0; j < 64; j++) {
                const pixelIndex = (i + j * 64) * 4;
                const noiseValue = noise.noise(i / 10, j / 10, 0) * 0.5 + 0.5;
                const color = baseColors[selectedPlanet];
                const smoothness = Math.pow(Math.sin(i * Math.PI / 64), 2) * Math.pow(Math.sin(j * Math.PI / 64), 2); // Smoothness factor
                const brightness = 0.7 + 0.3 * smoothness; // Adjust the brightness factor to control the edge darkness
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
</script>

<select bind:value={selectedPlanet} on:change={handleChangePlanet}>
    <option value="desert">Desert</option>
    <option value="jungle">Jungle</option>
    <option value="ice">Ice</option>
    <option value="water">Water</option>
</select>
<div id="container" bind:this={container}></div>

<style>
    #container {
        width: 400px;
        height: 400px;
        position: relative;
        margin: 0 auto;
    }

    select {
        position: absolute;
        z-index: 2;
        margin: 10px;
    }
</style>
