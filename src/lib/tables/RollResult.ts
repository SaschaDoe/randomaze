import type {Entry} from "./Entry";
import {Dice} from "./Dice";
import type {SingleRoll} from "./SingleRoll";


export class RollResult {
    public entries: Entry[] = [];
    public string: string = "";
    public dice: Dice = new Dice();
    rolls: SingleRoll[] = [];

    processAllEntries() {
        this.entries.forEach(e => e.execute(this));
    }

    withDice(dice: Dice){
        this.dice = dice;
        return this;
    }

    AddEntry(entry: Entry) {
        this.entries.push(entry);
    }
}