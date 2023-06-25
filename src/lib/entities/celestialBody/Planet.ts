import {Entity} from "../Entity";
import type {Ring} from "./Ring";
import type {Moon} from "./moon/Moon";

export class Planet extends Entity {
    name: string;
    type: string;
    nameTranslation: string;
    nameMeaning: string;

    color: { r: number, g: number, b: number };
    atmosphereColor: [{ r: number; b: number; g: number }, number];
    seed: number;
    resolution: number;
    noiseScale: number;
    brightness: number;
    size: string;
    atmosphere: string;

    weather: string;
    obliquity: number;
    rings: Ring[];
    ringColorName: string;
    moons: Moon[];
}