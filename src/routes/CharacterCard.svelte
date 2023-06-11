<script>
    import {Character} from "$lib/entities/Character.ts";
    import { createEventDispatcher } from 'svelte';

    export let character = new Character();

    const dispatch = createEventDispatcher();

    function deleteThisCharacter() {
        console.log('deleteThisCharacter inside CharacterCard: '+character.id);
        dispatch('deletePartyMember', character.id);
    }
</script>
<h2>Character with id {character.id}</h2>
<button on:click={deleteThisCharacter}>Delete</button>