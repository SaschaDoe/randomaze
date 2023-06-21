import {Entity} from "../Entity";
import {Planet} from "../celestialBody/Planet";
import {Star} from "../celestialBody/Star";

export class SolarSystem extends Entity{
    name: string;
    stage: string;
    stageDescription: string;
    age: number;
    isSelected: boolean;
    positionX: number;
    positionY: number;
    planets: Planet[];
    stars: Star[];

}