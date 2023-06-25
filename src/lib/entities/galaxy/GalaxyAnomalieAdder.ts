import {Dice} from "../../tables/Dice";
import type {Galaxy} from "./Galaxy";
import {GalaxyAnomaliesTable} from "../../tables/galaxy/GalaxyAnomaliesTable";

export class GalaxyAnomalieAdder{

    static scan(galaxy: Galaxy, inputDice?: Dice): number {
        let dice = new Dice();
        if(inputDice){
            dice = inputDice;
        }
        
        let randomNumber = dice.roll(20);
        let numberOfAnomalies: number;
        if(randomNumber <= 3){
            numberOfAnomalies = 0;
        }else if(randomNumber > 4 && randomNumber <= 15){
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