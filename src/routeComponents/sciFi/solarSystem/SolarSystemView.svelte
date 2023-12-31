<script>
    import SciFiCard from "../SciFiCard.svelte";
    import * as THREE from 'three';
    import {onMount} from 'svelte';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import {SeededNoise} from "../planet/SeededNoise.ts";
    import {selectedPlanet} from "./planetStore.ts";
    import {ImprovedNoise} from "three/addons/math/ImprovedNoise.js";
    export let solarSystem;

let container, controls;
let scene, camera, renderer;
let stars = [];
let planets = [];


function getScale(size) {
    let baseScale = 0.3;
    let variance = 0.2;
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

function calculatePixelColorAndAlpha(planetData, noiseValue, atmosphereColor, atmosphereTransparency) {
    if (planetData.atmosphere === "nitrogen-oxygen" && noiseValue > 0.7) {
    return [255, 255, 255, 255];
}

    return [
    atmosphereColor.r * noiseValue,
    atmosphereColor.g * noiseValue,
    atmosphereColor.b * noiseValue,
    255 * atmosphereTransparency * (planetData.atmosphere === "nitrogen-oxygen" ? noiseValue : 1)
    ];
}


function calculatePixelColorAndAlphaForWeather(planetData, noiseValue, atmosphereColor, atmosphereTransparency) {
    if(planetData.atmosphere === "nitrogen-oxygen") {
    if (planetData.weather === "foggy") {
    return [255, 255, 255, 150 * atmosphereTransparency]; // Foggy: All white, transparency based on atmosphereTransparency
}
    if (planetData.weather === "stormy") {

    //TODO should be cluster of white pixels and clusters of nearly transparent pixels
}
}
    return calculatePixelColorAndAlpha(planetData, noiseValue, atmosphereColor, atmosphereTransparency); // Default (moderate)
}

function createAtmosphere(planetData) {
    let noiseScale = 2;
    const atmosphereScale = getScale(planetData.size) * 1.05;
    let resolution = getResolution(planetData.size);
    const atmosphereGeometry = new THREE.SphereGeometry(atmosphereScale, resolution, resolution);
    const atmosphereNoise = new SeededNoise(planetData.seed + 1);
    const atmosphereTexture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);

    const [atmosphereColor, atmosphereTransparency] = planetData.atmosphereColor;
    const atmosphereMaterial = new THREE.MeshBasicMaterial({map: atmosphereTexture, transparent: true});

    for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
    const pixelIndex = (i + j * resolution) * 4;
    const noiseValue = (atmosphereNoise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + atmosphereNoise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2;

    const [r, g, b, a] = calculatePixelColorAndAlphaForWeather(planetData, noiseValue, atmosphereColor, atmosphereTransparency);

    atmosphereTexture.image.data.set([r, g, b, a], pixelIndex);
}
}

    atmosphereTexture.needsUpdate = true;
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);
    return atmosphereMesh;
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

    const atmosphereMesh = createAtmosphere(planetData);

    // Make sure to update the planetMesh variable to include the atmosphereMesh so that it gets removed in updatePlanetSize()
    planetMesh = [planetMesh, atmosphereMesh];

    return planetMesh;
}

let maxDistance;
let noiseScale = 2;
let brightness = 1;
function createStar(starData) {
    const scale = getScale(starData.size); // assuming starData has a size property
    const resolution = getResolution(starData.size); // assuming starData has a size property
    const geometry = new THREE.SphereGeometry(scale, resolution, resolution);
    const texture = new THREE.DataTexture(new Uint8Array(resolution * resolution * 4), resolution, resolution, THREE.RGBAFormat);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const noise = new ImprovedNoise();

    for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
    const pixelIndex = (i + j * resolution) * 4;
    const noiseValue = (noise.noise(i / noiseScale, j / noiseScale, 0) * 0.5 + 0.5 + noise.noise((i + 1) / noiseScale, (j + 1) / noiseScale, 0) * 0.5 + 0.5) / 2;
    const color = starData.color;
    texture.image.data[pixelIndex] = color.r * noiseValue * brightness;
    texture.image.data[pixelIndex + 1] = color.g * noiseValue * brightness;
    texture.image.data[pixelIndex + 2] = color.b * noiseValue * brightness;
    texture.image.data[pixelIndex + 3] = 255;
}
}

    texture.needsUpdate = true;
    let starMesh = new THREE.Mesh(geometry, material);
    return starMesh;
}

let minDistance;
function createStars() {
    for (let i = 0; i < solarSystem.stars.length; i++) {
    let starData = solarSystem.stars[i];
    let starMesh = createStar(starData);

    if (solarSystem.stars.length === 1) { // if only one star
    starMesh.position.set(0, 0, 0); // it stays in the middle
} else { // multiple stars
    let angle = (i / solarSystem.stars.length) * Math.PI * 2;
    let distance = minDistance / 2; // half of minDistance
    let positionX = distance * Math.cos(angle);
    let positionZ = distance * Math.sin(angle);
    starMesh.position.set(positionX, 0, positionZ);
}

    let velocity = 0.007;
    starMesh.velocity = velocity;

    stars.push(starMesh);
    scene.add(starMesh);
}
}

onMount(() => {
    scene = new THREE.Scene();

    const baseDistance = 15;
    const distancePerPlanet = 2;
    maxDistance = (baseDistance + distancePerPlanet * solarSystem.planets.length) * solarSystem.stars.length;
    minDistance = maxDistance; // set minDistance to maxDistance initially

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, maxDistance, maxDistance);

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    for (let i = 0; i < solarSystem.planets.length; i++) {
    let distance = (i + 1) * maxDistance / (solarSystem.planets.length + 1);
    if (distance < minDistance) {
    minDistance = distance;
}
}

    createStars();

    for (let i = 0; i < solarSystem.planets.length; i++) {
    let planetData = solarSystem.planets[i];
    let planetMeshArray = createPlanet(planetData);

    let angle = Math.random() * Math.PI * 2;
    let distance = (i + 1) * maxDistance / (solarSystem.planets.length + 1);
    let planetMesh = planetMeshArray[0];
    let positionX = distance * Math.cos(angle);
    let positionZ = distance * Math.sin(angle)
    planetMesh.position.set(positionX, 0, positionZ);

    let velocity = 0.007 / distance*2;
    let variance = 0.001;
    velocity += (Math.random()) * variance;
    planetMesh.velocity = velocity;

    let atmosphereMesh = planetMeshArray[1];
    atmosphereMesh.position.set(positionX, 0, positionZ);
    atmosphereMesh.velocity = planetMesh.velocity;
    let planet = [planetMesh, atmosphereMesh];
    planets.push(planet);

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

    for (let star of stars) {
    star.rotation.y += 0.01; // Add rotation to the star

    // Only move the stars along the orbit if there's more than one
    if (stars.length > 1) {
    let angle = Math.atan2(star.position.z, star.position.x) + star.velocity;
    let distance = star.position.length();
    star.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
}
}

    // Move each planet along its elliptic path
    for (let planetArray of planets) {
    let planet = planetArray[0];
    let angle = Math.atan2(planet.position.z, planet.position.x) + planet.velocity;
    let distance = planet.position.length();
    planet.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));

    let atmosphere = planetArray[1];
    angle = Math.atan2(atmosphere.position.z, atmosphere.position.x) + atmosphere.velocity;
    distance = atmosphere.position.length();
    atmosphere.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
}

    if($selectedPlanet){
    let planetIndex = solarSystem.planets.findIndex(planet => planet.name === $selectedPlanet.name);
    if(planetIndex !== -1) {
    let planet = planets[planetIndex][0];
    if (planet) {
    let cameraTarget = new THREE.Vector3(planet.position.x, planet.position.y, planet.position.z);
    let cameraDistance = 2;
    camera.position.set(
    planet.position.x + cameraDistance,
    planet.position.y + cameraDistance,
    planet.position.z + cameraDistance);
    camera.lookAt(cameraTarget);
    controls.target = cameraTarget;
}
}
}

    // Update camera controls before rendering
    controls.update();
    // Render the scene
    renderer.render(scene, camera);
}
    animate();
});

    function deselect() {
    selectedPlanet.set(null);
    camera.position.set(0, maxDistance, maxDistance);
}
    </script>

    <SciFiCard entity={solarSystem} components={components} defaultTab="details">

    <div slot="image">
    <span class="card-title">
    <div class="card-id">{solarSystem.id}:</div>
    <div class="card-name">{solarSystem.name}</div>
    </span>
    <div id="container" bind:this={container}></div>
    <button on:click={() => {deselect()}}>Deselect</button>
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