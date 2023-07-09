import {TerrainType} from "../hexmap/terrainType";

export function getColor(terrainType: TerrainType, colorPalette: string) {
    if (colorPalette === 'earthy') {
        return getEarthyColor(terrainType);
    } else {
        return getCustomColor(terrainType);
    }
}

function getEarthyColor(terrainType: TerrainType) {
    switch (terrainType) {
        case TerrainType.Water:
            return '#0000cd';  // Medium blue
        case TerrainType.Grass:
            return 'green';
        case TerrainType.Hills:
            //dark gray
            return '#a9a9a9';
        case TerrainType.Mountain:
            //very dark grey
            return '#696969';
        case TerrainType.Snow:
            return '#fffafa';  // Snow white
        case TerrainType.Desert:
            return '#ffd700';  // Gold
        case TerrainType.Tundra:
            return '#696969';  // Dark gray
        case TerrainType.Djungle:
            return '#115411';  // Forest green
        case TerrainType.Plains:
            return '#deb887';  // Burlywood, a color of dry grass
        case TerrainType.GrassHills:
            return '#2e8b57';  // Sea green, indicating a mix of grass and hill
        case TerrainType.SaltLake:
            return 'white';
        case TerrainType.IceFloe:
            return 'lightBlue';
        case TerrainType.DjungleHills:
            return '#006400';
        case TerrainType.HighMountain:
            return '#d3d3d3';
        case TerrainType.SnowMountain:
            return 'white';
        case TerrainType.Lava:
            return '#c11313FF'
        case TerrainType.AshPlains:
            return '#282626';
        case TerrainType.AshHills:
            return '#383838';
        default:
            return '#ffffff';
    }
}

function getCustomColor(terrainType: TerrainType) {
    switch (terrainType) {
        case TerrainType.Water:
            return '#0000ff';  // More deep blue
        case TerrainType.Grass:
            return 'green';
        case TerrainType.Hills:
            return '#8b4513';  // Darker brown to distinguish from mountains
        case TerrainType.Mountain:
            return '#696969';
        case TerrainType.Snow:
            return '#ffffff';
        case TerrainType.Desert:
            return 'yellow';
        case TerrainType.Tundra:
            return '#d3d3d3';  // Lighter grey, to distinguish from snow
        case TerrainType.Djungle:
            return '#015b01';  // Dark green
        case TerrainType.Plains:
            return '#a0a237'
        case TerrainType.GrassHills:
            return '#556b2f';  // Keep this color
        case TerrainType.SaltLake:
            return 'white';
        case TerrainType.IceFloe:
            // bright blue
            return '#00ffff';
        case TerrainType.DjungleHills:
            return '#006400';
        case TerrainType.HighMountain:
            return '#a9a9a9';
        case TerrainType.SnowMountain:
            return 'white';
        case TerrainType.Lava:
            return '#ff0000';
        case TerrainType.AshPlains:
            return '#131313';
        case TerrainType.AshHills:
            return '#383838';
        default:
            return '#ffffff';
    }
}