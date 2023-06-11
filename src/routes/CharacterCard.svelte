<script>
    import {Character} from "$lib/entities/character/Character.ts";
    import { createEventDispatcher } from 'svelte';
    import Modal from './Modal.svelte';
    let showModal = false;

    export let character = new Character();

    const dispatch = createEventDispatcher();

    function deleteThisCharacter() {
        console.log('deleteThisCharacter inside CharacterCard: '+character.id);
        dispatch('deletePartyMember', character.id);
    }
</script>
<h2>Character with id {character.id}</h2>
<button class="delete-button" on:click={() => showModal = true}>Delete</button>
{#if showModal}
    <Modal on:close={() => showModal = false}>
        <h2>Do you want Character {character.id} to delete?</h2>
        <button on:click={() => { deleteThisCharacter(); showModal = false }}>Yes</button>
        <button on:click={() => showModal = false}>No</button>
    </Modal>
{/if}
<style>
    .delete-button {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
    }
</style>