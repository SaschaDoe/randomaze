import {TerrainType} from "../domain/terrainType";

export class ImageDefinition{
    public static get() {
        const images = {
            [TerrainType.Water]: new Image(),
            [TerrainType.Grass]: new Image(),
            [TerrainType.Hills]: new Image(),
            [TerrainType.Mountain]: new Image(),
            [TerrainType.HighMountain]: new Image(),
        } as Record<TerrainType, HTMLImageElement>;

        images[TerrainType.Water].src = '/hextiles/water.png';
        images[TerrainType.Grass].src = '/hextiles/grass.png';
        images[TerrainType.Hills].src = '/hextiles/plain.png';
        images[TerrainType.Mountain].src = '/hextiles/mountain.png';
        images[TerrainType.HighMountain].src = '/hextiles/snow.png';

        return images;
    }
}