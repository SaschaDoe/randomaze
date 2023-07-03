<script>
    import {onMount} from 'svelte';
    import {createNoise2D} from "simplex-noise";
    import {hexbin as d3Hexbin} from 'd3-hexbin';
    import {format as d3Format, line as d3line, scaleLinear as d3scaleLinear, select, zoom as d3Zoom} from 'd3';


    let radius = 5;
    let height = 600;
    let width = 1300;
    let continentalFrequency = 300;
    let baseLevel = 0.25;
    let baseEdgeStrength = 10.0;
    let edgeStrength = 5.0;
    let islandWeight = 2;
    let randomIslandWeight = 0.008;

    $: { radius; width; height; continentalFrequency; edgeStrength; baseLevel;
        baseEdgeStrength; islandWeight; randomIslandWeight; renderTerrain(); }

    function generateTerrain(width, height) {
        let continentalSimplex = createNoise2D();
        let islandSimplex = createNoise2D();

        let terrain = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let h = 0;
                let continentalHeight = continentalSimplex(x / continentalFrequency, y / continentalFrequency) + baseLevel;

                let randomMinusOrPlusOne = Math.random() < 0.5 ? -1 : 1;
                let islandHeight = islandWeight * randomMinusOrPlusOne * islandSimplex(x / 10, y / 10) * 0.1 + 0.1;

                let randomAltered = Math.random() < randomIslandWeight ? true : false;

                let edge = edgeFunction(x);


                h = edge * continentalHeight +  islandHeight;

                if(randomAltered && h < 0.1){
                    //random number between 0.4 and 0.7
                    let randomAlteration = Math.random() * 0.3 + 0.6;
                    h += randomAlteration;
                }

                terrain.push([x, y, h]);
            }
        }
        return terrain;
    }



    // This function should be 0 on the edges (x=0 and x=width) and 1 in the middle
    // At the edges, the steepness should be high, and in the middle, it should be flat
    // The function should be symmetric around the middle

    function edgeFunction(x) {
        let result = Math.sin(Math.PI * x / 1000);
        return result;
    }

    function getColor(height) {
        if (height < 0.4) {
            return 'blue';
        } else if (height < 0.75) {
            return 'green';
        } else if (height < 0.9) {
            return 'brown';
        } else if (height < 1) {
            return 'grey';
        } else {
            return 'white';
        }
    }

    let svgElement, gElement;

    function renderTerrain() {
        // clear the previous terrain
        select(gElement).selectAll(".hexagon").remove();
        select(gElement).selectAll(".hexText").remove();

        let terrain = generateTerrain(width, height);
        let hexbin = d3Hexbin().radius(radius);
        let hexData = hexbin(terrain);
        const format = d3Format(".2f");  // Display 2 decimal places

        select(gElement)
            .selectAll(".hexagon")
            .data(hexData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => getColor(d[0][2]))
            .style("stroke", "black");
/*
        select(gElement)
            .selectAll(".hexText")
            .data(hexData)
            .join('text')
            .attr("class", "hexText")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("text-anchor", "middle")
            .style("font-size", "8px") // Adjust font size to fit in the hexagon
            .style("fill", "black")
            .text(d => format(d[0][2]));
*/
        let zoom = d3Zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                select(gElement).attr('transform', event.transform);
            });

        select(svgElement).call(zoom);
    }


    function rerender() {
        renderTerrain();
    }

    // Run on mount and every time one of the inputs changes
    onMount(renderTerrain);
    $: { radius; width; height; continentalFrequency; edgeStrength; renderTerrain(); } // Including edgeStrength in reactivity statement

    let plotSvgElement, plotGElement;

</script>

<div class="regler">
    <div class="control">
        <label htmlFor="elevation">Continental weight: </label>
        <input id="elevation" type="range" bind:value={continentalFrequency} min="1" max="1000" step="50"/>
        <span>{continentalFrequency}</span>
    </div>
    <div class="control">
        <label htmlFor="baseLevel">Base Level: </label>
        <input id="baseLevel" type="range" bind:value={baseLevel} min="0" max="1" step="0.05"/>
        <span>{baseLevel}</span>
    </div>
    <div class="control">
        <label htmlFor="islandWeight">Island Weight: </label>
        <input id="islandWeight" type="range" bind:value={islandWeight} min="0.2" max="5" step="0.2"/>
        <span>{islandWeight}</span>
    </div>
    <div class="control">
        <label htmlFor="randomIslandWeight">Random Island Weight: </label>
        <input id="randomIslandWeight" type="range" bind:value={randomIslandWeight} min="0.0" max="0.09" step="0.001"/>
        <span>{randomIslandWeight}</span>
    </div>
    <button on:click={rerender}>Re-render</button>
</div>


<div class="container">
    <svg bind:this={svgElement} width="100%" height="100%">
        <g bind:this={gElement}>
        </g>
    </svg>
</div>

<style>
    .container {
        width: 100%;
        height: 1000px;
    }
    .regler{
        margin-top: 30px;
    }

</style>
