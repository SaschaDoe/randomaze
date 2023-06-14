import {RollResult} from "./RollResult";

export abstract class Entry {
    public displayedText: string;
    protected constructor(labelInTable?: string) {
        if(!labelInTable){
            labelInTable = this.constructor.name;
        }
        this.displayedText = labelInTable;
    }
    execute(rollResult: RollResult) {
        throw new Error("Not implemented");
    }
}