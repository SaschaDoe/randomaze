<script>
    export let campaign;

    let isSideIndexOpen = false;

    function toggleSideIndex() {
        isSideIndexOpen = !isSideIndexOpen;
    }
</script>

<div class="container">
    <div id="entity-index">
        <div class="small-screen">
            <button on:click={toggleSideIndex}>
                {isSideIndexOpen ? '▲ Hide Entities' : '▼ Show Entities'}
            </button>
            {#if isSideIndexOpen}
                <ul>
                    {#if campaign.party.length > 0}
                        <li>
                            <a href="#Characters">Characters</a>
                            <ul>
                                {#each campaign.party as character}
                                    <li>
                                        <a href="#{character.id}">{character.name}</a>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/if}
                    {#if campaign.cultures.length > 0}
                        <li>
                            <a href="#Cultures">Cultures</a>
                            <ul>
                                {#each campaign.cultures as culture}
                                    <li>
                                        <a href="#{culture.id}">{culture.name}</a>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/if}
                </ul>
            {/if}
        </div>
        <div class="widescreen">
            <ul>
                {#if campaign.party.length > 0}
                    <li>
                        <a href="#Characters">Characters</a>
                        <ul>
                            {#each campaign.party as character}
                                <li>
                                    <a href="#{character.id}">{character.name}</a>
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/if}
                {#if campaign.cultures.length > 0}
                    <li>
                        <a href="#Cultures">Cultures</a>
                        <ul>
                            {#each campaign.cultures as culture}
                                <li>
                                    <a href="#{culture.id}">{culture.name}</a>
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</div>

<style>
    .container{
        margin-top: 50px;
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

        .widescreen{
            display: none;
        }

        .small-screen{
            display: block;
        }
    }
</style>
