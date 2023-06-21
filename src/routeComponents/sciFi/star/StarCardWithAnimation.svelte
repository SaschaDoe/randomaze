<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as THREE from 'three';
    import SciFiCard from "../SciFiCard.svelte";
    import {ImprovedNoise} from "three/addons/math/ImprovedNoise.js";
    import StarDetails from "./StarDetails.svelte";
    import StarAnomalies from "./StarAnomalies.svelte";

    export let star;
    let currentStar = star;
    let isError = false;
    let errorMessage = "";

    let container;
    let mesh;

    let scene;
    let camera;
    let renderer;

    let noiseScale = 2;
    let brightness = 1;

    function getScale(size) {
        let baseScale = 1;
        if(size === 'tiny')
            return baseScale;
        if(size === 'small')
            return baseScale * 1.25;
        if(size === 'medium')
            return baseScale * 1.5;
        if(size === 'large')
            return baseScale * 1.75;
        if(size === 'gigantic')
            return baseScale * 2;

        return baseScale;
    }

    let scale = getScale(star.size);

    function getResolution(size) {
        let baseResolution = 32;
        if(size === 'tiny')
            return baseResolution;
        if(size === 'small')
            return baseResolution;
        if(size === 'medium')
            return baseResolution * 2;
        if(size === 'large')
            return baseResolution * 5;
        if(size === 'gigantic')
            return baseResolution * 8;

        return baseResolution;
    }

    let resolution = getResolution(star.size);

    function createPlanet() {
        const geometry = new THREE.SphereGeometry(scale, resolution, resolution);
        const noise = new ImprovedNoise();
        const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const pixelIndex = (i + j * resolution) * 4;
                const noiseValue = (noise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + noise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2;
                const color = currentStar.color;
                texture.image.data[pixelIndex] = color.r * noiseValue * brightness;
                texture.image.data[pixelIndex + 1] = color.g * noiseValue * brightness;
                texture.image.data[pixelIndex + 2] = color.b * noiseValue * brightness;
                texture.image.data[pixelIndex + 3] = 255;
            }
        }

        texture.needsUpdate = true;
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    function updatePlanetSize() {
        scale = getScale(currentStar.size);
        resolution = getResolution(currentStar.size);
        mesh.geometry.dispose(); // Dispose of geometry
        mesh.material.dispose(); // Dispose of material
        if (mesh.material.map) mesh.material.map.dispose(); // Dispose of texture map if exists
        scene.remove(mesh);

        createPlanet();
    }

    onMount(() => {
        currentStar = star;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 3;

        createPlanet();
        let planetRotationSpeed = 0.002;

        const animate = function () {
            requestAnimationFrame(animate);

            mesh.rotation.y += planetRotationSpeed;

            renderer.render(scene, camera);
        };
        try{
            animate();
        } catch (e) {
            isError = true;
            errorMessage = e;
            console.log(e);
        }
    });

    afterUpdate(() => {
        currentStar = star;
        updatePlanetSize();
    });

    let components = [
        { name: 'details', component: StarDetails },
        { name: 'anomalies', component: StarAnomalies },
    ];
</script>


<SciFiCard entity={star} components={components} defaultTab="details">
    <div slot="image">
        <div>{star.id}: {star.name}</div>
        {#if isError}
            <div>There was an error rendering the planet:</div>
            <div>{errorMessage}</div>
        {/if}
        <div id="container" bind:this={container}></div>
    </div>
</SciFiCard>

<style>
    #container {
        width: 400px;
        height: 400px;
        position: relative;
        margin: 0 auto;
    }
</style>
