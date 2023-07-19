<script>
    import { onMount } from 'svelte';

    let canvas;
    let ctx;

    onMount(() => {
        ctx = canvas.getContext('2d');
        drawHexMap();
    });

    function drawHexMap() {
        const img = new Image();
        img.onload = function() {
            // The number of rows and columns of hexes
            const rows = 10;
            const columns = 10;

            // The size of each hex
            const hexSize = 64;

            // Spacing between hexes
            const spacing = 4;

            // Calculate horizontal and vertical distance between hexes
            const horizDist = hexSize + spacing;
            const vertDist = Math.sqrt(3)/2 * hexSize + spacing;

            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < columns; j++) {
                    const x = j * horizDist + ((i%2 === 0) ? 0 : horizDist/2); // stagger every other row
                    const y = i * vertDist;

                    // Draw the image on the canvas
                    ctx.drawImage(img, x, y, hexSize, hexSize);
                }
            }
        };
        img.src = '/static/hex_tile.png'; // your 64x64 pixel hex tile PNG image
    }
</script>

<canvas bind:this={canvas} width="800" height="800" />
