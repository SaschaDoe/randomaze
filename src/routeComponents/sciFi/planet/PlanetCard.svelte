<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

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
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: baseColors[selectedPlanet].r * 65536 + baseColors[selectedPlanet].g * 256 + baseColors[selectedPlanet].b });
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
