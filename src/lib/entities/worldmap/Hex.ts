export interface HexCoordinate {
    x: number;
    y: number;
}

export class HexField {
    x: number;
    y: number;
    terrainType: number;

    constructor(x: number, y: number, terrainType: number) {
        this.x = x;
        this.y = y;
        this.terrainType = terrainType;
    }
}

export class HexGrid {
    grid: HexField[][];

    constructor(width: number, height: number) {
        this.grid = createGrid(width, height);
    }
}

export function createGrid(width: number, height: number): HexField[][] {
    let grid: HexField[][] = new Array(height);
    for (let i = 0; i < height; i++) {
        grid[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            grid[i][j] = new HexField(j, i, 0);  // Terrain type 0 as default
        }
    }
    return grid;
}

export function getField(grid: HexGrid, x: number, y: number): HexField | undefined {
    if (y >= 0 && y < grid.grid.length && x >= 0 && x < grid.grid[0].length) {
        return grid.grid[y][x];
    }
    return undefined;
}

export function setFieldTerrain(grid: HexGrid, x: number, y: number, terrainType: number): void {
    grid.grid[y][x].terrainType = terrainType;
}

export function getHexNeighbors(hexgrid: HexGrid, x: number, y: number): (HexField | undefined)[] {
    // Define potential neighbors' offsets for even and odd columns
    const evenOffsets = [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
    const oddOffsets = [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }];

    const offsets = y % 2 === 0 ? evenOffsets : oddOffsets;

    // Get neighbors
    const neighbors = offsets
        .map(({ x: dx, y: dy }) => getField(hexgrid, x + dx, y + dy))
        .filter(field => field !== undefined);

    return neighbors;
}