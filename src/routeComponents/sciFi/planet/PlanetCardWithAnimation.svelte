<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as THREE from 'three';
    import { SeededNoise } from "./SeededNoise.ts";
    import SciFiCard from "../SciFiCard.svelte";
    import PlanetDetails from "./PlanetDetails.svelte";
    import PlanetContinents from "./PlanetContinents.svelte";
    import PlanetAnomalies from "./PlanetAnomalies.svelte";

    export let planet;
    let currentPlanet = planet;

    let container;
    let planetMesh;

    let scene;
    let camera;
    let renderer;

    let noiseScale = 2;
    let brightness = 0.5;

    function getScale(size) {
        let baseScale = 1;
        if(size === 'tiny')
            return baseScale * 0.5;
        if(size === 'small')
            return baseScale * 0.75;
        if(size === 'medium')
            return baseScale;
        if(size === 'large')
            return baseScale * 1.25;
        if(size === 'gigantic')
            return baseScale * 1.5;

        return baseScale;
    }

    let scale = getScale(planet.size);

    function getResolution(size) {
        let baseResolution = 32;
        if(size === 'tiny')
            return baseResolution / 2;
        if(size === 'small')
            return baseResolution;
        if(size === 'medium')
            return baseResolution * 2;
        if(size === 'large')
            return baseResolution * 4;
        if(size === 'gigantic')
            return baseResolution * 8;

        return baseResolution;
    }

    let resolution = getResolution(planet.size);

    function createPlanet() {
        const geometry = new THREE.SphereGeometry(scale, resolution, resolution);
        const noise = new SeededNoise(currentPlanet.seed);
        const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const pixelIndex = (i + j * resolution) * 4;
                const noiseValue = (noise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + noise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2;
                const color = currentPlanet.color;
                texture.image.data[pixelIndex] = color.r * noiseValue * brightness;
                texture.image.data[pixelIndex + 1] = color.g * noiseValue * brightness;
                texture.image.data[pixelIndex + 2] = color.b * noiseValue * brightness;
                texture.image.data[pixelIndex + 3] = 255;
            }
        }

        texture.needsUpdate = true;
        planetMesh = new THREE.Mesh(geometry, material);
        scene.add(planetMesh);
    }

    function updatePlanetSize() {
        scale = getScale(currentPlanet.size);
        resolution = getResolution(currentPlanet.size);
        scene.remove(planetMesh);
        createPlanet();
    }

    onMount(() => {
        currentPlanet = planet;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 3;

        createPlanet();

        const animate = function () {
            requestAnimationFrame(animate);
            planetMesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();
    });

    afterUpdate(() => {
        currentPlanet = planet;
        updatePlanetSize();
    });

    let components = [
        { name: 'details', component: PlanetDetails },
        { name: 'continents', component: PlanetContinents },
        { name: 'anomalies', component: PlanetAnomalies },
    ];
</script>


<SciFiCard entity={planet} components={components} defaultTab="details">
    <div slot="image">
        <div>{planet.id}: {planet.name}</div>
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
