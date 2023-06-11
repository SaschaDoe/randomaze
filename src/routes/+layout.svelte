<script>
    import Header from "./Header.svelte";
    import './styles.css';
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>

</div>

<style>
    .app {
        min-height: 100vh;
    }

    main {
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

</style>
