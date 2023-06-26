import {Entity} from "../Entity";

export class Star extends Entity{
    size: string = "";
    stage: string = "";
    luminosity: number = 0;
    mass: number = 0;
    surfaceTemperature: number = 0;
    color: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };
    name: string = "";
}
