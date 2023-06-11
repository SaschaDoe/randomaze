import {Entry} from "./Entry";

export class RollResult{
    public entry: Entry;
    withEntry(entry: Entry) {
        this.entry = entry;
        return this;
    }

    getString() {
        return this.entry.title;
    }
}