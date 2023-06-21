<script>
    import {Entity} from "$lib/entities/Entity.ts";
    import { createEventDispatcher } from 'svelte';
    import Modal from './Modal.svelte';
    import ExtendedCharacterCard from "./ExtendedCharacterCard.svelte";
    import SolarSystemCard from "../routeComponents/sciFi/solarSystem/SolarSystemCard.svelte";
    import GalaxyCard from "../routeComponents/sciFi/galaxy/GalaxyCard.svelte";
    import PlanetCardWithAnimation from "../routeComponents/sciFi/planet/PlanetCardWithAnimation.svelte";
    import StarCardWithAnimation from "../routeComponents/sciFi/star/StarCardWithAnimation.svelte";

    let showDeleteModal = false;
    let showDetailsModal = false;

    export let entity = new Entity();
    export let type = '';

    const dispatch = createEventDispatcher();

    function deleteThisEntity() {
        console.log('deleteThisEntity inside EntityCard: '+entity.id);
        dispatch('deleteEntity', { id: entity.id, type });
    }

    function closeDeleteModal() {
        console.log('closeDeleteModal inside EntityCard');
        showDeleteModal = false;
    }

    function closeDetailsModal() {
        showDetailsModal = false;
    }

    function openDetailsModal() {
        showDetailsModal = true;
    }

    function openDeleteModal(e) {
        e.stopPropagation();
        showDeleteModal = true;
    }

    function scrollToCulture(e) {
        e.stopPropagation();
        scrollToEntity(entity.culture.id);
    }

    function scrollToEntity(id){
        dispatch('scrollToEntity', id);
    }


</script>

<div class="card">
    <div class="header">
        <h3 on:click={openDetailsModal}>{entity.id} : {entity.name}</h3>
        <button class="delete-button" on:click={openDeleteModal}>Delete</button>
    </div>
    <div class="content" on:click={openDetailsModal}>
        {#if type === 'character'}
            <p>{entity.gender}</p>
            <a on:click={scrollToCulture}>{entity.culture.id}: {entity.culture.name}</a>
        {/if}
        {#if type === "planet"}
            <p>{entity.nameTranslation}</p>
        {/if}
        <!-- Add additional conditions for other types here -->
    </div>
    {#if showDeleteModal}
        <Modal on:close={closeDeleteModal}>
            <h2>Do you want {type} {entity.id} to delete?</h2>
            <button on:click={() => { deleteThisEntity(); closeDeleteModal(); }}>Yes</button>
            <button on:click={closeDeleteModal}>No</button>
        </Modal>
    {/if}
    {#if showDetailsModal}
        <Modal on:close={closeDetailsModal}>
            <!-- You can use a dynamic component here based on the type -->
            {#if type === 'character'}
                <ExtendedCharacterCard character={entity}/>
            {/if}
            {#if type === 'galaxy'}
                <GalaxyCard galaxy={entity}/>
            {/if}
            {#if type === 'solarSystem'}
                <SolarSystemCard solarSystem={entity}/>
            {/if}
            {#if type === 'star'}
                <StarCardWithAnimation star={entity}/>
            {/if}
            {#if type === 'planet'}
                <PlanetCardWithAnimation planet={entity}/>
            {/if}

        </Modal>
    {/if}
</div>

<style>
    .card {
        padding: 20px;
        border-radius: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        min-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .delete-button {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
    }

    .content a {
        color: #007bff;
        cursor: pointer;
    }

    .content a:hover {
        color: #0056b3;
    }
</style>
