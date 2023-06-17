<script>
    export let entity;
    export let components; // array of objects { name: '...', component: ... }
    export let defaultTab;
    let tabs = [];
    let currentTab = defaultTab;
    let currentIndex = tabs.findIndex(t => t === defaultTab);

    let isMobile = window.innerWidth <= 700;
    let showSection = isMobile ? 'info' : 'both'; // Default to 'info'
    let lastMobileSection = 'info'; // Remember last shown section on mobile


    $: {
        if (components && components.length > 0) {
            tabs = components.map(c => c.name);

            if (defaultTab === undefined) {
                defaultTab = tabs[0];
            }
            currentTab = defaultTab;
            currentIndex = tabs.findIndex(t => t === defaultTab);
        }
    }

    $: {
        if (defaultTab === undefined && components && components.length > 0) {
            defaultTab = components[0].name;
        }
        currentTab = defaultTab;
        currentIndex = components.findIndex(c => c.name === defaultTab);
    }



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

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function changeEntity() {
        console.log('change Entity in SciFiCard');
        dispatch('changeEntity');
    }

</script>

<div class="container">
    {#if showSection === 'image' || showSection === 'both'}
        <div class="image-section">
            <slot name="image"></slot>
        </div>
    {/if}

    {#if showSection === 'info' || showSection === 'both'}
        <div class="entity-information">
            <div class="navigation">
                <button on:click={prevTab} disabled={currentIndex === 0} class="nav-button">◀</button>
                <h2>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
                <button on:click={nextTab} disabled={currentIndex === tabs.length - 1} class="nav-button">▶</button>
            </div>

            {#each components as component (component.name)}
                {#if component.name === currentTab}
                    <svelte:component this={component.component} entity={entity} on:changeEntity={changeEntity} />
                {/if}
            {/each}
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
        overflow: hidden;
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