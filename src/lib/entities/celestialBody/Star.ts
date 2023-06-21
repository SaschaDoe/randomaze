import {Entity} from "../Entity";

export class Star extends Entity{
    size: string;
    stage: string;
    luminosity: number;
    mass: number;
    surfaceTemperature: number;
    color: { r, g, b };
    name: string;
}