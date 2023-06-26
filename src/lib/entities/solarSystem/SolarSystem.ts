import {Entity} from "../Entity";
import type {Planet} from "../celestialBody/Planet";
import type {Star} from "../celestialBody/Star";

export class SolarSystem extends Entity{
    name: string = "";
    stage: string = "";
    stageDescription: string = "";
    age: number  = 0;
    isSelected: boolean = false;
    positionX: number = 0;
    positionY: number = 0;
    planets: Planet[] = [];
    stars: Star[] = [];

    habitableZoneStart: number = 0; // the start of habitable zone in AU
    habitableZoneEnd: number = 0; // the end of habitable zone in AU
    lastDistanceFromStar: number = 0; // the last distance from star in AU
}