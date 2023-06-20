<script>
    import {onDestroy, onMount} from 'svelte';
    import * as THREE from 'three';
    import {SeededNoise} from "./SeededNoise.ts";
    import SciFiCard from "../SciFiCard.svelte";
    import PlanetDetails from "./PlanetDetails.svelte";
    import PlanetContinents from "./PlanetContinents.svelte";
    import PlanetAnomalies from "./PlanetAnomalies.svelte";

    export let planet;
    let currentPlanet = planet;
    let unsubscribe;

    let container;
    let planetMesh;
    let selectedPlanet = planet.type;

    // Base colors for each planet type

    let scene;
    let camera;
    let renderer;

    // Variables for controlling noise and brightness
    let noiseScale = 2;
    let brightness = 0.5;
    let resolution = 64;

        function createPlanet() {
            const geometry = new THREE.SphereGeometry(1, resolution, resolution);
            const noise = new SeededNoise(currentPlanet.seed);  // use currentPlanet here
            const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
            const material = new THREE.MeshBasicMaterial({ map: texture });

            for (let i = 0; i < resolution; i++) {
                for (let j = 0; j < resolution; j++) {
                    const pixelIndex = (i + j * resolution) * 4;
                    const noiseValue = (noise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + noise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2; // Wrap-around effect
                    const color = currentPlanet.color;  // use currentPlanet here
                    texture.image.data[pixelIndex] = color.r * noiseValue * brightness;
                    texture.image.data[pixelIndex + 1] = color.g * noiseValue * brightness;
                    texture.image.data[pixelIndex + 2] = color.b * noiseValue * brightness;
                    texture.image.data[pixelIndex + 3] = 255;
                }
            }

            texture.needsUpdate = true;
            planetMesh = new THREE.Mesh(geometry, material);  // update the new variable
            scene.add(planetMesh);
        }

    onMount(() => {
        currentPlanet = planet;  // You assign the prop to your local variable here
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 3;

        createPlanet();

        const animate = function () {
            requestAnimationFrame(animate);
            planetMesh.rotation.y += 0.01; // Adjust the rotation speed as desired
            renderer.render(scene, camera);
        };
        animate();
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    function handleChangePlanet(event) {
        selectedPlanet = event.target.value;
        scene.remove(planetMesh);  // use the new variable
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
