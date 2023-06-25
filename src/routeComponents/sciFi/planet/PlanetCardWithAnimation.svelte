<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as THREE from 'three';
    import { SeededNoise } from "./SeededNoise.ts";
    import SciFiCard from "../SciFiCard.svelte";
    import PlanetDetails from "./PlanetDetails.svelte";
    import PlanetContinents from "./PlanetContinents.svelte";
    import PlanetAnomalies from "./PlanetAnomalies.svelte";
    import MoonsCard from "./MoonsCard.svelte";

    export let planet;
    let currentPlanet = planet;
    let isError = false;
    let errorMessage = "";

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

    function calculatePixelColorAndAlpha(noiseValue, atmosphereColor, atmosphereTransparency) {
        if (currentPlanet.atmosphere === "nitrogen-oxygen" && noiseValue > 0.7) {
            return [255, 255, 255, 255];
        }

        return [
            atmosphereColor.r * noiseValue,
            atmosphereColor.g * noiseValue,
            atmosphereColor.b * noiseValue,
            255 * atmosphereTransparency * (currentPlanet.atmosphere === "nitrogen-oxygen" ? noiseValue : 1)
        ];
    }


    function calculatePixelColorAndAlphaForWeather(noiseValue, atmosphereColor, atmosphereTransparency) {
        if(currentPlanet.atmosphere === "nitrogen-oxygen") {
            if (currentPlanet.weather === "foggy") {
                return [255, 255, 255, 150 * atmosphereTransparency]; // Foggy: All white, transparency based on atmosphereTransparency
            }
            if (currentPlanet.weather === "stormy") {

                //TODO should be cluster of white pixels and clusters of nearly transparent pixels
            }
        }
        return calculatePixelColorAndAlpha(noiseValue, atmosphereColor, atmosphereTransparency); // Default (moderate)
    }

    function createAtmosphere() {
        const atmosphereScale = scale * 1.05;
        const atmosphereGeometry = new THREE.SphereGeometry(atmosphereScale, resolution, resolution);
        const atmosphereNoise = new SeededNoise(currentPlanet.seed + 1);
        const atmosphereTexture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);

        const [atmosphereColor, atmosphereTransparency] = planet.atmosphereColor;
        const atmosphereMaterial = new THREE.MeshBasicMaterial({map: atmosphereTexture, transparent: true});

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const pixelIndex = (i + j * resolution) * 4;
                const noiseValue = (atmosphereNoise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + atmosphereNoise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2;

                const [r, g, b, a] = calculatePixelColorAndAlphaForWeather(noiseValue, atmosphereColor, atmosphereTransparency);

                atmosphereTexture.image.data.set([r, g, b, a], pixelIndex);
            }
        }

        atmosphereTexture.needsUpdate = true;
        const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        atmosphereMesh.rotation.x = THREE.MathUtils.degToRad(currentPlanet.obliquity);
        scene.add(atmosphereMesh);
        return atmosphereMesh;
    }

    function createRings() {
        let meshes = [];
        if (currentPlanet.rings.length === 0) return meshes;

        // Size of the texture (use smaller values for more pixelated look)
        let textureSize = 64;

        // Create a canvas to draw your texture
        let canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        let context = canvas.getContext('2d');

        // Generate a noisy texture
        let imgData = context.createImageData(textureSize, textureSize);
        for (let i = 0; i < imgData.data.length; i += 4) {
            // Apply noise values (0-255) to each color channel
            let noise = Math.random() * 255;
            imgData.data[i] = noise;     // red
            imgData.data[i + 1] = noise; // green
            imgData.data[i + 2] = noise; // blue
            imgData.data[i + 3] = 255;   // alpha (fully opaque)
        }
        context.putImageData(imgData, 0, 0);

        // Create a texture from the canvas
        let texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter; // Pixelated look

        for (let i = 0; i < currentPlanet.rings.length; i++) {
            let ring = currentPlanet.rings[i];

            const ringWidth = 0.3 * scale; // Define width of each ring
            const baseInnerRadius = 1.4 * scale; // Define the innermost ring radius

            let innerRadius = baseInnerRadius + i * ringWidth; // Offset for each ring
            let outerRadius = innerRadius + ringWidth; // Outer radius is inner plus the width


            let thetaSegments = 64;  // Number of segments, increase for more detail

            let ringColor = ring.color;
            let ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
            let ringMaterial = new THREE.MeshBasicMaterial({
                map: texture,  // Apply the noisy texture
                color: `rgb(${ringColor.r}, ${ringColor.g}, ${ringColor.b})`,
                side: THREE.DoubleSide,
                opacity: ringColor.a,
                transparent: true
            });

            let ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
            ringMesh.rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(currentPlanet.obliquity);
            meshes.push(ringMesh);
        }

        return meshes;
    }

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
                texture.image.data[pixelIndex + 3] = 100;
            }
        }

        texture.needsUpdate = true;
        planetMesh = new THREE.Mesh(geometry, material);
        planetMesh.rotation.x = THREE.MathUtils.degToRad(currentPlanet.obliquity);
        console.log("set planet rotation to: " + currentPlanet.obliquity + " degrees");
        scene.add(planetMesh);

        //Create cloudy atmosphere
        const atmosphereMesh = createAtmosphere();
        const ringMeshes = createRings();

        for(let i = 0; i < ringMeshes.length; i++){
            ringMeshes[i].rotation.x = THREE.MathUtils.degToRad(currentPlanet.obliquity);
            scene.add(ringMeshes[i]);
        }

        planetMesh = [planetMesh, atmosphereMesh];
        if(ringMeshes){
            planetMesh.push(...ringMeshes);
        }

    }

    function updatePlanetSize() {
        scale = getScale(currentPlanet.size);
        resolution = getResolution(currentPlanet.size);

        planetMesh.forEach(mesh => {
            mesh.geometry.dispose(); // Dispose of geometry
            mesh.material.dispose(); // Dispose of material
            if (mesh.material.map) mesh.material.map.dispose(); // Dispose of texture map if exists
            scene.remove(mesh);
        });

        createPlanet();

        for(let i = 2; i < planetMesh.length; i++){
            planetMesh[i].rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(currentPlanet.obliquity);
        }
    }

    onMount(() => {
        currentPlanet = planet;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 3.2;

        createPlanet();
        let planetRotationSpeed = 0.002;
        let atmosphereRotationSpeed = planetRotationSpeed * 0.9; // 90% of the planet rotation speed

        const animate = function () {
            requestAnimationFrame(animate);

            planetMesh[0].rotation.y += planetRotationSpeed;
            planetMesh[1].rotation.y += atmosphereRotationSpeed;
            const ringRotationBaseSpeed = planetRotationSpeed; // Base rotation speed for the rings
            const ringRotationSpeedDecreaseFactor = 0.0005; // How much speed to decrease per ring

            for(let i = 2; i < planetMesh.length; i++){
                const ringIndex = i - 2;
                const ringRotationSpeed = ringRotationBaseSpeed - ringIndex * ringRotationSpeedDecreaseFactor;
                planetMesh[i].rotation.z -= ringRotationSpeed; // Rotate the rings around the y-axis
            }

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
        currentPlanet = planet;
        updatePlanetSize();
    });
    let components = [
        {  name: 'details', component: PlanetDetails },
    { name: 'continents', component: PlanetContinents },
    { name: 'anomalies', component: PlanetAnomalies },
    ];
    if(planet.moons.length > 0){
        components.push({ name: 'moons', component: MoonsCard });
    }

</script>


<SciFiCard entity={planet} components={components} defaultTab="details">
    <div slot="image">
        <div>{planet.id}: {planet.name}</div>
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
