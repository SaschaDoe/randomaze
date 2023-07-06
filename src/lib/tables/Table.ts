import type {Entry} from "./Entry";
import {Dice} from "./Dice";
import {RollResult} from "./RollResult";
import {DisplayedTextEntry} from "./DisplayedTextEntry";
import {SingleRoll} from "./SingleRoll";

export class Table{
    public readonly title: string;
    public entries: Entry[] = [];
    private dice: Dice;

    constructor(title: string, dice?: Dice) {
        this.title = title;
        if(dice){
            this.dice = dice;
        }else{
            this.dice = new Dice();
        }

    }

    EnumAsTableEntries(enumObj: any) {
        for(let enumMember in enumObj) {
            if(Object.prototype.hasOwnProperty.call(enumObj, enumMember)) {
                let isValueProperty = !isNaN(Number(enumMember));
                if(!isValueProperty) {
                    this.entries.push(new DisplayedTextEntry(enumObj[enumMember]));
                }
            }
        }
    }

    roll(dice?: Dice) {
        let rollResult = this.getResult(dice);
        let roll = this.getRoll(dice);

        let entry = this.entries[roll];
        rollResult.AddEntry(entry);

        rollResult.rolls.push(new SingleRoll(this, entry));
        rollResult.processAllEntries();
        return rollResult;
    }

    private getRoll(dice: Dice | undefined) {
        let currentDice;
        if (dice == null) {
            currentDice = this.dice;
        } else {
            currentDice = dice;
        }
        if (this.entries.length > 0) {
            let firstEntry = this.entries[0];
            if (firstEntry.probability > -1) {
                // Sort the entries by their probabilities
                let sortedEntries = this.entries.sort((a, b) => a.probability - b.probability);

                // Generate a random number between 0 and 1
                let randomNum = Math.random();

                // Find where this random number falls in the cumulative probabilities
                let cumulativeProbability = 0;
                for (let i = 0; i < sortedEntries.length; i++) {
                    cumulativeProbability += sortedEntries[i].probability;
                    if (randomNum <= cumulativeProbability) {
                        return i;
                    }
                }
            }
        }
        return currentDice.roll(this.entries.length);

    }

    private getResult(dice: Dice | undefined) {
        let rollResult = new RollResult();
        if (dice) {
            rollResult = rollResult.withDice(dice);
        }
        return rollResult;
    }

    ArrayAsTableEntries(array: string[], probabilities?: number[]) {
        array.forEach(a => this.entries.push(new DisplayedTextEntry(a)));
        if (probabilities) {
            this.entries.forEach((entry, index) => entry.probability = probabilities[index]);
        }
        return this;
    }
}