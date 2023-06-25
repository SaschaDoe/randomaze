import {Entity} from "../Entity";
import type {SolarSystem} from "../solarSystem/SolarSystem";
export class Galaxy extends Entity{
    type: string = "";
    name: string = "";
    imagePath: string = "";
    color: string = "";
    rotationVelocity: number = 0;
    size: string = "";
    sizeInLightyears: number = 0;
    mass: string = "";
    massInSolarMasses: string = "";
    hasActiveGalacticNucleus: boolean = false;
    age: string = "";
    ageInYears: number = 0;
    anomalies: string[] = [];

    isAlreadyScannedForAnomalies: boolean = false;

    solarSystems: SolarSystem[] = [];

}