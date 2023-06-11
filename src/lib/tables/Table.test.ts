import {describe, it} from "vitest";
import {Table} from "./Table";
import {Entry} from "./Entry";
import {FakeDice} from "./FakeDice";

describe('table', () => {
    it('first entry when roll a 0', () => {
        let table = new Table("Test Table");
        let entry = new Entry("Test Entry 1");
        table.entries.push(entry);
        let fakeDice = new FakeDice().withRollResult(1);

        let result = table.roll(fakeDice);

        expect(result.entry).toBe(entry);
    });
});