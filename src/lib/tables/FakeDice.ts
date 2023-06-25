import {Dice} from "./Dice";

export class FakeDice extends Dice{
    private rollResult: number = 0;
    public rolledNumbers: number[] = [];
    private rollResults: number[] = [];
    withRollResult(rollResult: number): FakeDice {
        this.rollResult = rollResult;
        return this;
    }

    public roll(): number {
        if(this.rollResults){
            if(this.rollResults.length > 0) {
                let nextNumber = this.rollResults.shift();
                if(nextNumber){
                    this.rolledNumbers.push(nextNumber);
                    return nextNumber;
                }
            }
        }
        this.rolledNumbers.push(this.rollResult);
        return this.rollResult;
    }

    withRollResults(numbers: number[]) {
        this.rollResults = numbers;
        return this;
    }

    rollInterval(min: number, max: number): any {
        return this.roll();
    }

    rollRandom(): number {
        return this.roll();
    }
}