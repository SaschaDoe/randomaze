import {Entity} from "../Entity";
import type {Ring} from "./Ring";
import type {Moon} from "./moon/Moon";

export class Planet extends Entity {
    name: string = "";
    type: string = "";
    distanceFromStar: number = 0;
    nameTranslation: string = "";
    nameMeaning: string = "";

    color: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };
    atmosphereColor: [{ r: number; b: number; g: number }, number] = [{ r: 0, g: 0, b: 0 }, 0];
    seed: number = 0;
    resolution: number = 0;
    noiseScale: number = 0;
    brightness: number = 0;
    size: string = "";
    atmosphere: string = "";

    weather: string = "";
    obliquity: number = 0;
    rings: Ring[] = [];
    ringColorName: string = "";
    moons: Moon[] = [];
}