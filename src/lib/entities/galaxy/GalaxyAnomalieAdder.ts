import type {CampaignHandler} from "../CampaignHandler";
import {Mediator} from "../Mediator";
import {Campaign} from "../Campaign";
import {Dice} from "../../tables/Dice";
import {Galaxy} from "./Galaxy";
import {GalaxyAnomaliesTable} from "../../tables/galaxy/GalaxyAnomaliesTable";

export class GalaxyAnomalieAdder{

    static scan(galaxy: Galaxy, inputDice?: Dice): number {
        let dice = new Dice();
        if(inputDice){
            dice = inputDice;
        }
        
        let randomNumber = dice.roll(20);
        let numberOfAnomalies = 0;
        if(randomNumber <= 3){
            numberOfAnomalies = 0;
        }else if(randomNumber > 9 && randomNumber <= 15){
            numberOfAnomalies = 1;
        }else if(randomNumber > 15 && randomNumber <= 18){
            numberOfAnomalies = 2;
        }else{
            numberOfAnomalies = 3;
        }
        for(let i = 0; i < numberOfAnomalies; i++){
            let anomalie = new GalaxyAnomaliesTable().roll(dice).string;
            if(!galaxy.anomalies.includes(anomalie)){
                galaxy.anomalies.push(anomalie);
            }
        }
        galaxy.isAlreadyScannedForAnomalies = true;
        return galaxy.id;
    }


}