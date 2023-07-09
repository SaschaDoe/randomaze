import type {FullWorldMap} from "../hexmap/fullWorldMap";
import {TerrainType} from "../hexmap/terrainType";

export const TerrainColors: Record<TerrainType, string> = {
    [TerrainType.Water]: '#0000ff',      // Blue
    [TerrainType.Grass]: '#008000',      // Green
    [TerrainType.Hills]: '#3b5323',      // Dark Green
    [TerrainType.Mountain]: '#808080',   // Gray
    [TerrainType.Desert]: '#edc9af',     // Desert
    [TerrainType.Snow]: '#ffffff',       // White
    [TerrainType.Tundra]: '#bfdc95',     // Tundra Green
    [TerrainType.Djungle]: '#00755e',    // Jungle Green
    [TerrainType.Plains]: '#aad75b',     // Plains Green
    [TerrainType.GrassHills]: '#4d8c57', // Darker Green
    [TerrainType.SaltLake]: '#c0c0c0',   // Light Gray
    [TerrainType.IceFloe]: '#dce2e2',    // Lighter White
    [TerrainType.DjungleHills]: '#00563f', // Dark Jungle Green
    [TerrainType.HighMountain]: '#666666', // Darker Gray
    [TerrainType.SnowMountain]: '#e3e3e3', // Snowy Mountain
    [TerrainType.Lava]: '#ff4500',       // Orange-red
    [TerrainType.AshPlains]: '#2f4f4f',  // Dark Slate Gray
    [TerrainType.AshHills]: '#708090',   // Slate Gray
};

export class WorldMapCanvas {

    private showBorder = false;
    withBorder(showBorder: boolean){
        this.showBorder = showBorder;
        return this;
    }
    drawMap(canvas: HTMLCanvasElement | null, worldMap: FullWorldMap) {
        if (!canvas) {
            console.log('Canvas is not ready');
            return;
        }

        console.log('drawMap');
        const context = canvas.getContext('2d');

        const elementSize = 10;  // size of each square in pixels

        if (context === null) {
            throw new Error('2D context not supported');
        }
        context.clearRect(0, 0, canvas.width, canvas.height);

        for(let element of worldMap.elements){
            context.fillStyle = TerrainColors[element.terrainType];
            context.fillRect(element.x * elementSize, element.y * elementSize, elementSize, elementSize);

            if (this.showBorder) {
                context.strokeStyle = '#000000';  // Change this to the color you want for the border
                context.lineWidth = 1;  // Change this to control the thickness of the border
                context.strokeRect(element.x * elementSize, element.y * elementSize, elementSize, elementSize);
            }
        }
        console.log('drawMap done');
    }

    drawHex(context: CanvasRenderingContext2D, centerX: number, centerY: number, sideLength: number, color: string) {
        const sqrt3 = Math.sqrt(3);
        context.beginPath();
        context.moveTo(centerX, centerY - sideLength / 2);
        context.lineTo(centerX + sqrt3/2 * sideLength, centerY);
        context.lineTo(centerX + sqrt3/2 * sideLength, centerY + sideLength);
        context.lineTo(centerX, centerY + sideLength + sideLength / 2);
        context.lineTo(centerX - sqrt3/2 * sideLength, centerY + sideLength);
        context.lineTo(centerX - sqrt3/2 * sideLength, centerY);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = '#000000';
        context.lineWidth = 1;
        context.stroke();
    }

    drawMapWithHexes(canvas: HTMLCanvasElement | null, worldMap: FullWorldMap, sideLength: number) {
        if (!canvas) {
            console.log('Canvas is not ready');
            return;
        }

        const context = canvas.getContext('2d');
        if (context === null) {
            throw new Error('2D context not supported');
        }

        const hexHeight = Math.sqrt(3) * sideLength;
        const hexWidth = 2 * sideLength;
        const offset = 20;

        canvas.width = worldMap.getWidth() * hexWidth * 0.85 + hexWidth / 2 + 2 * offset;  // Added hexWidth/2 to account for the half-hex offset of every other row
        canvas.height = worldMap.getHeight() * hexHeight * 0.85 + hexHeight / 2 + 2 * offset;  // Added hexHeight/2 to account for the half-hex offset in height

        context.clearRect(0, 0, canvas.width, canvas.height);

        for(let element of worldMap.elements){
            const hexX = element.x * hexWidth * 0.85 + ((element.y % 2) * hexWidth / 2) + offset;
            const hexY = element.y * hexHeight * 0.85   + offset;
            const color = TerrainColors[element.terrainType];
            this.drawHex(context, hexX, hexY, sideLength, color);
        }
    }

    getHexAtPoint(x: number, y: number, worldMap: FullWorldMap, hexSize: number){

    }


}
