import {FullWorldMap} from "../domain/fullWorldMap";
import {CompressedWorldMap} from "../domain/compressedWorldMap";
import {hexbin as d3Hexbin} from 'd3-hexbin';
import {ColorPalette, ColorPalettes} from "./colorPalettes";
import {select, zoom} from "d3";
import {getColor} from "../../map/ColorPalettes";
import {TerrainType} from "../domain/terrainType";

export class D3WorldMapRenderer{
    private fullWorldMap: FullWorldMap = new FullWorldMap();
    private radius: number = 10;
    withFullWorldMap(fullWorldMap: FullWorldMap) {
        this.fullWorldMap = fullWorldMap;
        return this;
    }

    withRadius(radius: number) {
        this.radius = radius;
        return this;
    }

    renderOverviewWorldMap(svgElement: SVGSVGElement, compressFactor= 2) {
        let dataArray: [number, number][] = this.fullWorldMap.elements.map(hex => [hex.x * 10, hex.y * 10]);

        let colorMap = new Map();

        this.fullWorldMap.elements.forEach(hex => {
            let key = `${hex.x},${hex.y}`;
            let color = ColorPalettes.getColor(hex.terrainType, ColorPalette.Earthy);
            colorMap.set(key, color);
        });

        let hexbin = d3Hexbin().radius(this.radius);
        let hexbinData = hexbin(dataArray);

        console.log("dataArray length: " + dataArray.length);
        console.log("Hexbin data length: " + hexbinData.length);
        console.log("Full world map elements length: " + this.fullWorldMap.elements.length);

        let gElement = select(svgElement).append('g');

        gElement
            .selectAll(".hexagon")
            .data(hexbinData)
            .join('path')
            .attr("class", "hexagon")
            .attr("d", hexbin.hexagon())
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("fill", d => {
                let firstPoint = d[0];
                let key = `${firstPoint[0]},${firstPoint[1]}`;
                return colorMap.get(key);
            })
            .style("stroke", "black")
        // ...

        let myZoom = zoom()
            .scaleExtent([0.1, 5])
            .on('zoom', (event) => {
                gElement.attr('transform', event.transform);
            });
        (select(svgElement) as any).call(myZoom);

    }

}