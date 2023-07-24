import {makeNoise2D} from 'open-simplex-noise';
import {TerrainType} from "./terrainType";

export class TerrainTypeAssigner {
    private noise2D: (x: number, y: number) => number;

    constructor() {
        this.noise2D = makeNoise2D(Math.random());
    }

    withSeed(seed: number) {
        this.noise2D = makeNoise2D(seed);
        return this;
    }

    getTerrainTypeAt(x: number, y: number) {
        const noise = this.noise2D(x / 100, y / 100);

        if(noise < -0.1) {
            return TerrainType.Water;
        } else if(noise < 0.1) {
            return TerrainType.Grass;
        } else if(noise < 0.3) {
            return TerrainType.Hills;
        } else if(noise < 0.5) {
            return TerrainType.Mountain;
        } else {
            return TerrainType.HighMountain;
        }
    }
}
