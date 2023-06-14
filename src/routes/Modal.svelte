<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="modal-background" on:click={closeModal}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()}>
        <slot></slot>
    </div>
</div>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 101;
    }

    .modal-content {
        background-color: #fff;
        border-radius: 8px;
        max-width: 90%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
</style>
