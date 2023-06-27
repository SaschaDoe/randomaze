import {HexGrid} from "./Hex";

export class WorldMap{
    map: number[][] = [];
    seed: number = 0;
    hex: HexGrid = new HexGrid(0, 0);
}