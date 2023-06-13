<script>
    import {Entity} from "$lib/entities/Entity.ts";
    import { createEventDispatcher } from 'svelte';
    import Modal from './Modal.svelte';
    import ExtendedCharacterCard from "./ExtendedCharacterCard.svelte";

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
</script>

<div class="card">
    <div class="header">
        <h3 on:click={openDetailsModal}>{entity.id} : {entity.name}</h3>
        <button class="delete-button" on:click={openDeleteModal}>Delete</button>
    </div>
    <div class="content" on:click={openDetailsModal}>
        {#if type === 'character'}
            <p>{entity.gender}</p>
            <p>{entity.culture.name}</p>
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
            <!-- Add additional conditions for other types here -->
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
</style>
