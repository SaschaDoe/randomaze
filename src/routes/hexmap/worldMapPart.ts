import type {WorldElement} from "./worldElement";
import {TerrainType} from "./terrainType";

export class WorldMapPart {
    private elements: WorldElement[] = [];

    withElements(worldElements: WorldElement[]) {
        this.elements = worldElements;
        return this;
    }

    getElements() {
        return this.elements;
    }

    count(terrainType: TerrainType) {
        return this.elements.filter(element => element.terrainType === terrainType).length;
    }

    getDominantTerrainType() {
        let terrainCounts: { [key in TerrainType]?: number; } = {};

        let terrainTypes = Object.values(TerrainType).filter((type): type is TerrainType => typeof type === 'number');

        terrainTypes.forEach((terrainType: TerrainType) => {
            terrainCounts[terrainType] = this.count(terrainType);
        });

        let dominantTerrainType = this.elements.length > 0 ? this.elements[0].terrainType : TerrainType.Water;
        let maxCount = 0;

        for (const terrainType in terrainCounts) {
            if (terrainCounts[terrainType as unknown as TerrainType]! > maxCount) {
                maxCount = terrainCounts[terrainType as unknown as TerrainType]!;
                dominantTerrainType = terrainType as unknown as TerrainType;
            }
        }

        return dominantTerrainType;
    }

}
