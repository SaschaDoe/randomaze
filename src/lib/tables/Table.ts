import {Entry} from "./Entry";
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
        if (dice == null) {
            return this.dice.roll(this.entries.length);
        } else {
            return dice.roll(this.entries.length);
        }
    }

    private getResult(dice: Dice | undefined) {
        let rollResult = new RollResult();
        if (dice) {
            rollResult = rollResult.withDice(dice);
        }
        return rollResult;
    }

    ArrayAsTableEntries(array: string[]) {
        array.forEach(a => this.entries.push(new DisplayedTextEntry(a)));
        return this;
    }
}