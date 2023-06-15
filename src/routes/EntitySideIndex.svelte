<script>
    import {Campaign, getEntityTypes} from "$lib/entities/Campaign.ts";
    import { onMount } from 'svelte';

    export let campaign = new Campaign();
    $: entityTypes = getEntityTypes(campaign);
    let isSideIndexOpen = false;

    function toggleSideIndex() {
        isSideIndexOpen = !isSideIndexOpen;
    }

    onMount(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                isSideIndexOpen = false;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<div class="container">
    <div id="entity-index">
        <div class="small-screen">
            <div class="hide-show-buttons">
                <button on:click={toggleSideIndex}>
                    {isSideIndexOpen ? '▲ Hide Entities' : '▼ Show Entities'}
                </button>
            </div>
            {#if isSideIndexOpen}
                <div class="list">
                    <ul>
                        {#each entityTypes as entityType}
                            {#if campaign[entityType].length > 0}
                                <li>
                                    <a href="#{entityType}">{entityType}</a>
                                    <ul>
                                        {#each campaign[entityType] as entity}
                                            <li>
                                                <a href="#{entity.id}">{entity.name}</a>
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
        <div class="widescreen">
            <ul>
                {#each entityTypes as entityType}
                    {#if campaign[entityType].length > 0}
                        <li>
                            <a href="#{entityType}">{entityType}</a>
                            <ul>
                                {#each campaign[entityType] as entity}
                                    <li>
                                        <a href="#{entity.id}">{entity.name}</a>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    .container {
        margin-top: 50px;
    }

    a {
        color: black;
    }

    .widescreen {
        display: none;
    }

    .small-screen {
        display: block;
        max-height: 200px; /* or any other value */
        overflow-y: auto;
    }

    .hide-show-buttons{
        position: fixed;
        margin-top: 10px;
    }

    .list{
        margin-top: 50px;
    }

    #entity-index {
        flex-basis: 20%;
        position: fixed;
        width: 19%
    }

    @media screen and (max-width: 1200px) {
        #entity-index {
            position: fixed;
            top: 25px;
            right: auto;
            width: 100%;
            z-index: 10;
            background-color: white;
        }

        :global(body) {
            max-width: 100%;
            padding-top: 3rem;
        }

        .widescreen {
            display: none;
        }

        .small-screen {
            display: block;
        }
    }

    @media screen and (min-width: 1200px) {
        .widescreen {
            display: block;
        }

        .small-screen {
            display: none;
        }
    }
</style>
