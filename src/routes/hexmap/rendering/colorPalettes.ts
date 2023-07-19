import type {TerrainType} from "../domain/terrainType";

export enum ColorPalette{
    Earthy = 'Earthy',
    Bright = 'Bright',
    Dark = 'Dark',
    Contrast = 'Contrast',
    Colorblind = 'Colorblind',
}

export class ColorPalettes{
    static getColor(terrainType: TerrainType, colorPalette: ColorPalette) {
        if (colorPalette === ColorPalette.Earthy) {
            return ColorPalettes.getEarthyColor(terrainType);
        } else {
            return ColorPalettes.getCustomColor(terrainType);
        }
    }

    static getEarthyColor(terrainType: TerrainType) {
        return 'blue';
    }

    static getCustomColor(terrainType: TerrainType) {
        return 'red';
    }
}