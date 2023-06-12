import {Entry} from "./Entry";
import {Dice} from "./Dice";
import {SingleRoll} from "./SingleRoll";


export class RollResult {
    public entries: Entry[] = [];
    public string: string = "";
    public dice: Dice;
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