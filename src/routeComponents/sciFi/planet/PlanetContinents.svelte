<script>
    export let entity;
</script>

<a href={"/map/"} class="scan-button">Scan surface</a>

<style>
    .scan-button {
        display: inline-block;
        background: none;
        border: 2px solid lawngreen;
        color: lawngreen;
        font-size: 1em;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .scan-button:hover {
        background: lawngreen;
        color: black;
    }
</style>
