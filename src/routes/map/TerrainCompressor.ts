import {HexField} from "./hexField";
import {TerrainType} from "../hexmap/domain/terrainType";

//TODO: Compress terrain 2d array. a compress factor of 2 means the terrain is compressed to half the size.
//First look up how many TerrainType.Water is in the area. If it is more water than other than it is water
//If not than count the other terrain types and choose the most common one.
export class TerrainCompressor {
    /*
    //TODO the hexfield is a one dimensional array but the x and y values of a hexfield are interpreted as 2d...
    public compress(terrain: HexField[], compressFactor: number): HexField[][] {
        const compressedTerrain: HexField[]= [];
        const chunkSize = compressFactor;
        let y = 0;
        for (let i = 0; i < terrain.length; i += chunkSize) {
            let x = 0;
            for (let j = 0; j < terrain[0].length; j += chunkSize) {
                const terrainChunk = terrain.slice(i, i + chunkSize).map(line => line.slice(j, j + chunkSize));
                const flattenedTerrain = terrainChunk.flat();

                const terrainTypeCount = new Map<TerrainType, number>();
                flattenedTerrain.forEach(hexField => {
                    const count = terrainTypeCount.get(hexField.terrainType) || 0;
                    terrainTypeCount.set(hexField.terrainType, count + 1);
                });

                let maxCount = 0;

                let dominantTerrainType = TerrainType.Water;
                terrainTypeCount.forEach((count, terrainType) => {
                    if (count > maxCount) {
                        maxCount = count;
                        dominantTerrainType = terrainType;
                    }
                });
                let hexField = new HexField(x,y, 0, dominantTerrainType, 0, 0);
                compressedTerrain[compressedTerrain.length - 1].push(hexField);
                x++;
            }
           y++;
        }

        return compressedTerrain;
    }*/
}

