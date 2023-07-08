import type {FullWorldMap} from "./fullWorldMap";
import {TerrainType} from "./terrainType";

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
    static drawMap(canvas: HTMLCanvasElement, worldMap: FullWorldMap) {
        const context = canvas.getContext('2d');
        const elementSize = 10;  // size of each square in pixels

        if (context === null) {
            throw new Error('2D context not supported');
        }

        for(let element of worldMap.elements){
            const color = TerrainColors[element.terrainType];
            context.fillStyle = color;
            context.fillRect(element.x * elementSize, element.y * elementSize, elementSize, elementSize);
        }
    }
}