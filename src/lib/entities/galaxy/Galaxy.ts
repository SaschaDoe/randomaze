import {Entity} from "../Entity";
import {SolarSystem} from "../solarSystem/SolarSystem";
export class Galaxy extends Entity{
    type: string;
    name: string;
    imagePath: string;
    color: string;
    rotationVelocity: number;
    size: string;
    sizeInLightyears: number;
    mass: string;
    massInSolarMasses: string;
    hasActiveGalacticNucleus: boolean;
    age: string;
    ageInYears: number;
    anomalies: string[];

    isAlreadyScannedForAnomalies: boolean;

    solarSystems: SolarSystem[];

}