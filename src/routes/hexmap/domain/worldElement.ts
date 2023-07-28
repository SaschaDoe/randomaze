import {TerrainType} from "./terrainType";

export class WorldElement{
    public x = 0;
    public y = 0;
    public h = 0;
    public terrainType: TerrainType = TerrainType.Water;
    public temperature = 0;
    public dryness = 0;
    public id = 0;

    withLocation(x: number,y: number){
        this.x = x;
        this.y = y;
        return this;
    }

    withId(id: number){
        this.id = id;
        return this;
    }

    withHeight(h: number){
        this.h = h;
        return this;
    }

    withTerrainType(terrainType: TerrainType){
        this.terrainType = terrainType;
        return this;
    }

    withTemperature(temperature: number){
        this.temperature = temperature;
        return this;
    }

    withDryness(dryness: number){
        this.dryness = dryness;
        return this;
    }


}