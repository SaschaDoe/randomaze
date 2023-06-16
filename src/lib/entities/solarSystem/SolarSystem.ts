import {Entity} from "../Entity";
import {Planet} from "../planet/Planet";

export class SolarSystem extends Entity{
    name: string;
    size: string;
    stage: string;
    stageDescription: string;
    age: number;
    isSelected: boolean;
    positionX: number;
    positionY: number;
    planets: Planet[];

}