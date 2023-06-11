import {Entry} from "./Entry";
import {Dice} from "./Dice";
import {RollResult} from "./RollResult";

export class Table{
    public readonly name: string;
    public readonly entries: Entry[];
    constructor(name: string) {
        this.name = name;
        this.entries = [];
    }

    public roll(dice?: Dice) {
        if(dice === undefined) dice = new Dice(this.entries.length);
        let entry = this.entries[dice.roll()-1];

        return new RollResult().withEntry(entry);
    }
}