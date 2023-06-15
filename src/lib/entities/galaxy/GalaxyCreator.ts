import type {CampaignHandler} from "../CampaignHandler";
import {Dice} from "../../tables/Dice";
import {Mediator} from "../Mediator";
import {Campaign} from "../Campaign";
import {Galaxy} from "./Galaxy";
import {GalaxyTypes, GalaxyTypeTable} from "../../tables/galaxy/GalaxyTypeTable";
import {GalaxyNameTable} from "../../tables/galaxy/GalaxyNameTable";
import {SpiralGalaxyImagesTable} from "../../tables/galaxy/SpiralGalaxyImagesTable";
import {OtherGalaxyImagesTable} from "../../tables/galaxy/OtherGalaxyImagesTable";
import {CssColors} from "../../tables/other/ColoursTable";
import {Sizes, SizeTable} from "../../tables/other/SizeTable";
import {AgeTable} from "../../tables/other/AgeTable";



export class GalaxyCreator implements CampaignHandler{
    private mediator: Mediator;
    private campaign: Campaign;
    private dice: Dice;

    constructor(campaign: Campaign, mediator: Mediator) {
        this.mediator = mediator;
        this.campaign = campaign;
    }
    handle(dice?: Dice): number {
        if(!dice){
            this.dice = new Dice();
        }else{
            this.dice = dice;
        }

        let galaxy = new Galaxy();

        galaxy.type = new GalaxyTypeTable().roll(dice).string;

        const otherTypes = GalaxyTypes.filter(type => type !== galaxy.type);

        do {
            galaxy.name = new GalaxyNameTable().roll(dice).string;
        } while (otherTypes.some(type => galaxy.name.includes(type)));

        galaxy.imagePath = "/galaxies/";
        if(galaxy.type === "spiral"){
            galaxy.imagePath += new SpiralGalaxyImagesTable().roll(dice).string;
        }else{
            galaxy.imagePath += new OtherGalaxyImagesTable().roll(dice).string;
        }
       galaxy.color = this.getColorFrom(galaxy.name);
        if(galaxy.color === "black"){
            let randomNumber = this.dice.roll(2);
            if(randomNumber === 0){
                galaxy.imagePath = "/galaxies/stars.png";
            }else{
                galaxy.imagePath = "/galaxies/starsDarker.png";
            }
            galaxy.color = "transparent";
        }

        this.campaign.galaxies.push(galaxy);
        galaxy.rotationVelocity = this.dice.rollInterval(150, 300);
        let sizeFromName = this.getSizeFromName(galaxy.name);
        if(sizeFromName === ""){
            galaxy.size = new SizeTable().roll(dice).string;
        }else{
            galaxy.size = sizeFromName;
        }

        galaxy.sizeInLightyears = this.getSizeInLightyears(galaxy.size);
        galaxy.mass = new SizeTable().roll(dice).string;
        galaxy.massInSolarMasses = this.getSizeInSolarMasses(galaxy.mass);
        galaxy.hasActiveGalacticNucleus = this.dice.roll(100) > 90;
        galaxy.age = new AgeTable().roll(dice).string;
        galaxy.ageInYears = this.getAgeInYears(galaxy.age);
        return galaxy.id;
    }


    private getColorFrom(name: string) {
        const words = name.split(' ');

        for(let color of CssColors){
            for(let word of words){
                if(word === color){
                    return color;
                }
            }
        }
        return "transparent";
    }

    private getSizeInLightyears(size: string) {
        switch (size) {
            case "tiny": {
                return this.dice.rollInterval(1000, 7000);
            }
            case "small": {
                return this.dice.rollInterval(7000, 10000);
            }
            case "medium": {
                return this.dice.rollInterval(10000, 100000);
            }
            case "large": {
                return this.dice.rollInterval(100000, 1000000);
            }
            case "gigantic": {
                return this.dice.rollInterval(1000000, 10000000);
            }

        }
        return 0;
    }

    private getSizeInSolarMasses(mass: string) {
        let firstNumber = this.dice.rollInterval(1, 100);
        let secondNumber = 0;
        switch (mass) {
            case "tiny": {
                secondNumber = 9;
                break;
            }
            case "small": {
                secondNumber = 10;
                break;
            }
            case "medium": {
                secondNumber = 11;
                break;
            }
            case "large": {
                secondNumber = 12;
                break;
            }
            case "gigantic": {
                secondNumber = 13;
                break;
            }
        }


        return firstNumber + "x 10^" + secondNumber;
    }


    private getAgeInYears(age: string) {
        let ageInMillionYears = 0;
        switch (age) {
            case "just-created": {
                ageInMillionYears = this.dice.rollInterval(1, 400);
                break;
            }
            case "young": {
                ageInMillionYears = this.dice.rollInterval(400, 1000);
                break;
            }
            case "middle-aged": {
                ageInMillionYears = this.dice.rollInterval(1000, 10000);
                break;
            }
            case "old": {
                ageInMillionYears = this.dice.rollInterval(10000, 14000);
                break;
            }
            case "ancient": {
                ageInMillionYears = this.dice.rollInterval(14000, 15000);
                break;
            }
        }

        return ageInMillionYears;
    }

    private getSizeFromName(name: string) {
        const words = name.split(' ');

        for(let color of Sizes){
            for(let word of words){
                if(word === color){
                    return color;
                }
            }
        }
        return "";
    }
}