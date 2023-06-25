import {Entry} from "./Entry";
import type {RollResult} from "./RollResult";
import type {Table} from "./Table";
import {SingleRoll} from "./SingleRoll";
import type {Dice} from "./Dice";

class Addition{
    string: string = "";
    table: Table | undefined;
    stringFunction: (input: string, dice?: Dice) => string = (input: string) => "";
    static ofString(input: string){
        let addition = new Addition();
        addition.string = input;
        return addition;
    }

    static ofTable(input: Table){
        let addition = new Addition();
        addition.table = input
        return addition;
    }

    static ofStringFunction(func: (input: string) => string) {
        let addition = new Addition();
        addition.stringFunction = func;
        return addition;
    }
}

export class AddTableEntry extends Entry {
    private readonly additions: Addition[] = [];
    constructor(displayedText?: string) {
        super(displayedText);
    }
    execute(rollResult: RollResult) {
        for(let addition of this.additions){

            let additionString: string;
            if(addition.string){
                additionString = addition.string;
            }else if(addition.table){
                console.log("Rolling table" + addition.table.title);
                let result = addition.table.roll(rollResult.dice);
                let roll = new SingleRoll(addition.table,result.entries[0]);
                rollResult.rolls.push(roll);
                additionString = result.string;
            }else{
                additionString = addition.stringFunction(rollResult.string, rollResult.dice);
            }

            if(additionString){
                rollResult.string += additionString;
            }
        }
    }

    addTable(table: Table){
        this.additions.push(Addition.ofTable(table));
        this.displayedText += "{"+table.title+"} ";
        return this;
    }
    addString(string: string){
        this.additions.push(Addition.ofString(string));
        this.displayedText += string;
        return this;
    }

    addFunction(func: (input: string) => (string)) {
        this.additions.push(Addition.ofStringFunction(func));
        this.displayedText += "{"+func.name+"} ";
        return this;
    }
}