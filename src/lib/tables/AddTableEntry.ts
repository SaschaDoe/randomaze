import {Entry} from "./Entry";
import {RollResult} from "./RollResult";
import {Table} from "./Table";
import {SingleRoll} from "./SingleRoll";

class Addition{
    string: string;
    table: Table;
    stringfunction: (input: string) => string;
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

    getString(rollResult: RollResult){
        if(this.string){
            return this.string;
        }else if(this.table){
            return this.table.roll(rollResult.dice).string;
        }else{
            return this.stringfunction(rollResult.string);
        }
    }

    static ofStringFunction(func: (input: string) => string) {
        let addition = new Addition();
        addition.stringfunction = func;
        return addition;
    }
}

export class AddTableEntry extends Entry {
    private readonly additions: Addition[] = [];
    constructor(displayedText: string) {
        super(displayedText);
    }
    execute(rollResult: RollResult) {
        for(let addition of this.additions){

            let additionString: string;
            if(addition.string){
                additionString = addition.string;
            }else if(addition.table){
                let result = addition.table.roll(rollResult.dice);
                let roll = new SingleRoll(addition.table,result.entries[0]);
                rollResult.rolls.push(roll);
                additionString = result.string;
            }else{
                additionString = addition.stringfunction(rollResult.string);
            }

            if(additionString){
                rollResult.string += additionString;
            }
        }
    }

    addTable(table: Table){
        this.additions.push(Addition.ofTable(table));
        return this;
    }
    addString(string: string){
        this.additions.push(Addition.ofString(string));
        return this;
    }

    addFunction(func: (input: string) => (string)) {
        this.additions.push(Addition.ofStringFunction(func));
        return this;
    }
}