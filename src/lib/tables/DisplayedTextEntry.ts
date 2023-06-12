import {Entry} from "./Entry";
import {RollResult} from "./RollResult";
export class DisplayedTextEntry extends Entry {
    constructor(displayedText: string) {
        super(displayedText);
    }

    execute(rollResult: RollResult) {
        rollResult.string += this.displayedText;
        return;

    }
}