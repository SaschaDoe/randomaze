<script>
    import SolarSystemDetails from "./SolarSystemDetails.svelte";
    import SolarSystemPlanets from "./SolarSystemPlanets.svelte";
    import SolarSystemAnomalies from "./SolarSystemAnomalies.svelte";
    import SciFiCard from "../SciFiCard.svelte";
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    export let solarSystem;

    let components = [
        { name: 'details', component: SolarSystemDetails },
        { name: 'planets', component: SolarSystemPlanets },
        { name: 'anomalies', component: SolarSystemAnomalies },
    ];

        let container;
        let scene, camera, renderer;
        let star, planets = [];

        onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();

        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        let controls = new OrbitControls(camera, renderer.domElement);

        star = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
        );
        scene.add(star);

        const maxDistance = 10; // Maximale Entfernung von der Sonne
        const planetCount = solarSystem.planets.length;

        for (let i = 0; i < planetCount; i++) {
        let distance = (i + 1) * maxDistance / (planetCount + 1); // Gleichmäßige Entfernungen
        let size = Math.random() * 0.5; // Zufällige Größe

        let planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x888888 })
        );

        // Startposition und Geschwindigkeit
        let angle = Math.random() * Math.PI * 2;
        planetMesh.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
        planetMesh.velocity = 0.01 + Math.random() * 0.01; // Zufällige Geschwindigkeit

        scene.add(planetMesh);
        planets.push(planetMesh);
    }

        camera.position.z = 15; // Kamera weiter weg

        const animate = function () {
        requestAnimationFrame(animate);

        star.rotation.y += 0.01;

        for (let planet of planets) {
        let angle = Math.atan2(planet.position.z, planet.position.x) + planet.velocity;
        let distance = planet.position.length();
        planet.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
    }

        controls.update();
        renderer.render(scene, camera);
    };

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
