import type {Color} from "./PlanetCreator";

export class Ring{
    color: Color;
    innerRadius: number;
    outerRadius: number;
    name: string;
    
    constructor(name: string, color: Color, innerRadius: number, outerRadius: number){
        this.name = name;
        this.color = color;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
    }
}