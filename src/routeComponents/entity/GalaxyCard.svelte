<script>
    import GalaxyDetails from "./GalaxyDetails.svelte";
    import GalaxyAnomalies from "./GalaxyAnomalies.svelte";

    export let galaxy;

    let currentTab = 'details'; // 'details', 'systems', 'anomalies'
    let tabs = ['details', 'systems', 'anomalies'];
    let currentIndex = 0;

    let isMobile = window.innerWidth <= 700;
    let showSection = isMobile ? 'info' : 'both'; // Default to 'info'
    let lastMobileSection = 'info'; // Remember last shown section on mobile

    function nextTab() {
        if (currentIndex < tabs.length - 1) {
            currentIndex += 1;
            currentTab = tabs[currentIndex];
        }
    }

    function prevTab() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            currentTab = tabs[currentIndex];
        }
    }

    function toggleSection(section) {
        showSection = section;
        if (isMobile) lastMobileSection = section; // Update last shown section on mobile
    }

    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 700;
        if (!isMobile) {
            showSection = 'both';
        } else {
            showSection = lastMobileSection; // Restore last shown section when resizing back to small
        }
    });
</script>


<div class="container">
    {#if showSection === 'image' || showSection === 'both'}
        <div class="image-section">
            <div class="galaxy-name-id">{galaxy.id}: {galaxy.name}</div>
            <div class="image-container">
                <img class="galaxy-image" src={galaxy.imagePath} alt="Random Galaxy">
                <div class="color-overlay" style="background: {galaxy.color};"></div>
            </div>
        </div>
    {/if}

    {#if showSection === 'info' || showSection === 'both'}
        <div class="entity-information">
            <div class="navigation">
                <button on:click={prevTab} disabled={currentIndex === 0} class="nav-button">◀</button>
                <h2>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
                <button on:click={nextTab} disabled={currentIndex === tabs.length - 1} class="nav-button">▶</button>
            </div>

            {#if currentTab === 'details'}
                <GalaxyDetails galaxy={galaxy}></GalaxyDetails>
            {:else if currentTab === 'systems'}
                <p>No System</p>
            {:else if currentTab === 'anomalies'}
                <GalaxyAnomalies galaxy={galaxy}></GalaxyAnomalies>
            {/if}
        </div>
    {/if}

    {#if isMobile}
        <div class="navigation-buttons">
            {#if showSection === 'info'}
                <button on:click={() => toggleSection('image')} class="nav-button">&lt;&lt;</button>
                <div></div> <!-- Placeholder for alignment -->
            {/if}
            {#if showSection === 'image'}
                <div></div> <!-- Placeholder for alignment -->
                <button on:click={() => toggleSection('info')} class="nav-button">&gt;&gt;</button>

            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        position: relative;
        padding: 10px;
        font-family: 'Orbitron', sans-serif;
        color: lawngreen;
        background-color: black;
        display: flex;
        justify-content: space-between;
        cursor: crosshair;
    }

    .image-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 350px;
    }
    .galaxy-name-id {
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .image-container {
        position: relative;
        height: 400px;
        width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .entity-information {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Changed from 'space-between' to 'flex-start' */
        width: 350px;
        height: 420px; /* Adjust this to the desired height */
        overflow: auto; /* This allows the content to scroll */
        border: 2px solid lawngreen;
        border-radius: 10px;
        padding: 10px;
        margin-left: 20px;
        background-color: rgba(0,0,0,0.7);
    }

    .galaxy-image, .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .color-overlay {
        mix-blend-mode: multiply;
    }
    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: lawngreen;
        border-bottom: 2px solid lawngreen;
        padding: 10px 0;
    }
    .nav-button {
        background: none;
        border: none;
        color: lawngreen;
        font-size: 1.5em;
        cursor: pointer;
    }
    .nav-button:disabled {
        color: gray;
    }
    @media (max-width: 700px) {
        .container {
            flex-direction: column;
            align-items: center;
        }

        .navigation-buttons {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
        }
    }

    @media (min-width: 700px) {
        .navigation-buttons {
            display: none;
        }
    }
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
    }
</style>