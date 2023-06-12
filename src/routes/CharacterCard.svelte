<script>
    import {Character} from "$lib/entities/character/Character.ts";
    import { createEventDispatcher } from 'svelte';
    import Modal from './Modal.svelte';
    import ExtendedCharacterCard from "./ExtendedCharacterCard.svelte";

    let showDeleteModal = false;
    let showDetailsModal = false;

    export let character = new Character();

    const dispatch = createEventDispatcher();

    function deleteThisCharacter() {
        console.log('deleteThisCharacter inside CharacterCard: '+character.id);
        dispatch('deletePartyMember', character.id);
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

<div class="character-card">
    <div class="header">
        <h3 on:click={openDetailsModal}>Character with id {character.id}</h3>
        <button class="delete-button" on:click={openDeleteModal}>Delete</button>
    </div>
    <div class="content" on:click={openDetailsModal}>
        <p>{character.gender}</p>
        <p>Culture: {character.culture.name}</p>
    </div>
    {#if showDeleteModal}
        <Modal on:close={closeDeleteModal}>
            <h2>Do you want Character {character.id} to delete?</h2>
            <button on:click={() => { deleteThisCharacter(); closeDeleteModal(); }}>Yes</button>
            <button on:click={closeDeleteModal}>No</button>
        </Modal>
    {/if}
    {#if showDetailsModal}
        <Modal on:close={closeDetailsModal}>
            <ExtendedCharacterCard {character}/>
        </Modal>
    {/if}
</div>

<style>
    .character-card {
        padding: 20px;
        border-radius: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        min-width: 400px;
        display: flex;
        flex-direction: column; /* Changed from row (default) to column */
        align-items: stretch; /* Stretches the children to fit the width */
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
