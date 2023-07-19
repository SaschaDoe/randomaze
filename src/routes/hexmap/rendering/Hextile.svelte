<script>
    export let src = "";
    export let x = 0;
    export let y = 0;
</script>

<style>
    .hex {
        position: absolute;
        width: 64px;
        height: 64px;
    }
</style>

<img class="hex" src={src} alt="hex tile" style="left: {x}px; top: {y}px;">