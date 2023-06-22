<script>
    import { writable } from 'svelte/store'; // import writable store

    export let entity;
    export let components; // array of objects { name: '...', component: ... }
    export let defaultTab;
    let tabs = [];
    let currentTab = defaultTab;
    let currentIndex = tabs.findIndex(t => t === defaultTab);

    let isMobile = window.innerWidth <= 700;
    let showSection = writable(isMobile ? 'info' : 'both'); // use writable store
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

    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 700;
        if (!isMobile) {
            showSection.set('both'); // use .set method
        } else {
            showSection.set(lastMobileSection); // use .set method and Restore last shown section when resizing back to small
        }
    });

</script>
<div class="scrollable">

<div class="container">

        <div class="image-section">
            <slot name="image"></slot>
        </div>
    {#if $showSection === 'info' || $showSection === 'both'} <!-- use $showSection -->
        <div class="entity-information">
            <div class="navigation">
                <button on:click={prevTab} disabled={currentIndex === 0} class="nav-button">◀</button>
                <h2>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
                <button on:click={nextTab} disabled={currentIndex === tabs.length - 1} class="nav-button">▶</button>
            </div>

            {#each components as component (component.name)}
                {#if component.name === currentTab}
                    <svelte:component this={component.component} entity={entity}/>
                {/if}
            {/each}
        </div>
    {/if}
</div>

</div>

<style>
    .scrollable{
        overflow: auto;
        height: 100vh;
    }

    .scrollable::-webkit-scrollbar {
        width: 10px;
        background: black;
    }

    .scrollable::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .scrollable::-webkit-scrollbar-thumb {
        background: lawngreen;
        border-radius: 5px;
    }

    .scrollable::-webkit-scrollbar-thumb:hover {
        background: darkgreen;
    }

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
    }

    @media (min-width: 700px) {

        .scrollable{
            height: 100%;
        }
    }

</style>