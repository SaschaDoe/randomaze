<script>
    import {currentHeading} from "../store.ts";
    import {AllTables} from "$lib/tables/AllTables.ts";

    let isSideIndexOpen = false;

    function toggleSideIndex() {
        isSideIndexOpen = !isSideIndexOpen;
    }

    function toggle(index) {
        let category = AllTables[index];
        category.isOpen = !category.isOpen;
        AllTables[index] = category;
    }
</script>

<div id="container">
    <div id="table-of-contents">
        <div class="small-screen">
        <button on:click={toggleSideIndex}>
            {isSideIndexOpen ? '▲ Hide Contents' : '▼ Show Contents'}
        </button>
        {#if isSideIndexOpen}
            <ul>
                {#each AllTables as category, index}
                    <li>
                        <a on:click={() => toggle(index)} href="#{category.name}"
                           class:active={$currentHeading === category.name}>
                            {category.name}
                        </a>

                        {#if category.isOpen}
                            <ul>
                                {#each category.tables as table}
                                    <li>
                                        <a href="#{table.title}">{table.title}</a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </li>
                {/each}
            </ul>
            {/if}
        </div>
        <div class="widescreen">
                <ul>
                    {#each AllTables as category, index}
                        <li>
                            <a on:click={() => toggle(index)} href="#{category.name}"
                               class:active={$currentHeading === category.name}>
                                {category.name}
                            </a>

                            {#if category.isOpen}
                                <ul>
                                    {#each category.tables as table}
                                        <li>
                                            <a href="#{table.title}">{table.title}</a>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </li>
                    {/each}
                </ul>
        </div>

    </div>
</div>

<style>
    .active {
        color: purple;
    }

    a {
        color: black;
    }

    .widescreen{
        display: block;
    }

    .small-screen{
        display: none;
    }

    #table-of-contents {
        position: fixed;
        top: 0;
        left: 0;
        padding: 1rem;
        right: 1080px;
    }

    :global(body) {
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
    }


    @media screen and (max-width: 1200px) {
        #table-of-contents {
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

        .widescreen{
            display: none;
        }

        .small-screen{
            display: block;
        }
    }
</style>