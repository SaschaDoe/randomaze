<script>
    import SolarSystemDetails from "./SolarSystemDetails.svelte";
    import SolarSystemPlanets from "./SolarSystemPlanets.svelte";
    import SolarSystemAnomalies from "./SolarSystemAnomalies.svelte";
    import SciFiCard from "../SciFiCard.svelte";
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import {SeededNoise} from "../planet/SeededNoise.ts";

    export let solarSystem;

    let components = [
        { name: 'details', component: SolarSystemDetails },
        { name: 'planets', component: SolarSystemPlanets },
        { name: 'anomalies', component: SolarSystemAnomalies },
    ];

    let container;
    let scene, camera, renderer;
    let star, planets = [];

    function getScale(size) {
        let baseScale = 0.2;
        let variance = 0.1;
        if(size === 'tiny')
            return baseScale;
        if(size === 'small')
            return baseScale + variance * 0.5;
        if(size === 'medium')
            return baseScale + variance;
        if(size === 'large')
            return baseScale + variance * 1.5;
        if(size === 'gigantic')
            return baseScale + variance * 2;

        return baseScale;
    }


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

    function createPlanet(planetData) {
        const scale = getScale(planetData.size);
        const resolution = getResolution(planetData.size);
        const geometry = new THREE.SphereGeometry(scale, resolution, resolution);
        const noise = new SeededNoise(planetData.seed);
        const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const pixelIndex = (i + j * resolution) * 4;
                const noiseValue = (noise.noise(i / resolution, j / resolution, 0) * 0.5 + 0.5);
                const color = planetData.color;
                texture.image.data[pixelIndex] = color.r * noiseValue;
                texture.image.data[pixelIndex + 1] = color.g * noiseValue;
                texture.image.data[pixelIndex + 2] = color.b * noiseValue;
                texture.image.data[pixelIndex + 3] = 255;
            }
        }

        texture.needsUpdate = true;
        let planetMesh = new THREE.Mesh(geometry, material);
        scene.add(planetMesh);

        return planetMesh;
    }

    onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();

        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        let controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 20, 0);  // Set camera to look from above
        controls.update();

        star = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xffff00 })
        );
        scene.add(star);

        const maxDistance = 15; // Maximale Entfernung von der Sonne

        for (let i = 0; i < solarSystem.planets.length; i++) {
            let planetData = solarSystem.planets[i];
            let planetMesh = createPlanet(planetData);

            // Startposition und Geschwindigkeit
            let angle = Math.random() * Math.PI * 2;
            let distance = (i + 1) * maxDistance / (solarSystem.planets.length + 1); // Gleichmäßige Entfernungen
            planetMesh.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));

            planetMesh.velocity = 0.02 / distance;
            planets.push(planetMesh);

            let geometry = new THREE.BufferGeometry();
            let vertices = [];

            // A circle has 2π radians, we calculate the position of each vertex
            for (let i = 0; i <= 100; i++) {
                let theta = (i / 100) * Math.PI * 2;
                vertices.push(distance * Math.cos(theta), 0, distance * Math.sin(theta));
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xAAAAAA }));
            scene.add(line);
        }



        function animate() {
            requestAnimationFrame(animate);

            // Rotation of the star
            star.rotation.y += 0.01;

            // Move each planet along its elliptic path
            for (let planet of planets) {
                let angle = Math.atan2(planet.position.z, planet.position.x) + planet.velocity;
                let distance = planet.position.length();
                planet.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
            }

            // Update camera controls before rendering
            controls.update();

            // Render the scene
            renderer.render(scene, camera);
        }

        animate();
    });
</script>

<SciFiCard entity={solarSystem} components={components} defaultTab="details">
    <div slot="image">
        <div>{solarSystem.id}: {solarSystem.name}</div>
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
