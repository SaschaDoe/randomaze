import {describe, expect, it} from "vitest";
import {Table} from "./Table";
import {FakeDice} from "./FakeDice";
import {DisplayedTextEntry} from "./DisplayedTextEntry";
import {AddTableEntry} from "./AddTableEntry";

describe('table', () => {
    it('first entry when roll a 0', () => {
        let table = new Table("Test Table");
        let entry = new DisplayedTextEntry("Test Entry 1");
        table.entries.push(entry);
        let fakeDice = new FakeDice().withRollResult(0);

        let result = table.roll(fakeDice);

        expect(table.title).toBe("Test Table");
        expect(result.rolls.length).toBe(1);
        expect(result.rolls[0].entry).toBe(entry);
    });

    it('show history', () => {
        let table = new Table("Test Table");
        let additionalTable = new Table("Additional Table");
        let additionalTableEntry = new DisplayedTextEntry("Test Entry 2");
        additionalTable.entries.push(additionalTableEntry);
        let entry = new AddTableEntry("Test Entry 1").addTable(additionalTable);
        table.entries.push(entry);
        let fakeDice = new FakeDice().withRollResult(0);

        let result = table.roll(fakeDice);

        expect(table.title).toBe("Test Table");
        expect(result.rolls.length).toBe(2);
        expect(result.rolls[0].table).toBe(table);
        expect(result.rolls[0].entry).toBe(entry);
        expect(result.rolls[1].table).toBe(additionalTable);
        expect(result.rolls[1].entry).toBe(additionalTableEntry);
        expect(result.string).toBe("Test Entry 2");
    });

    it('show history roll 1', () => {
        let table = new Table("Test Table");
        let additionalTable = new Table("Additional Table");
        let additionalTableEntry = new DisplayedTextEntry("additional table entry");
        let additionalTableEntry2 = new DisplayedTextEntry("additional table entry 2");
        additionalTable.entries.push(additionalTableEntry);
        additionalTable.entries.push(additionalTableEntry2);
        let entry2 = new AddTableEntry("Additional Table").addTable(additionalTable);
        let entry1 = new DisplayedTextEntry("Test Entry 2")
        table.entries.push(entry1);
        table.entries.push(entry2);
        let fakeDice = new FakeDice().withRollResult(1);

        let result = table.roll(fakeDice);

        expect(table.title).toBe("Test Table");
        expect(result.rolls.length).toBe(2);
        expect(result.rolls[0].table).toBe(table);
        expect(result.rolls[0].entry).toBe(entry2);
        expect(result.rolls[1].table).toBe(additionalTable);
        expect(result.rolls[1].entry).toBe(additionalTableEntry2);
        expect(result.string).toBe("additional table entry 2");
    });

    it('show history concat to long string given roll 0', () => {
        let table = new Table("Test Table");
        let additionalTable = new Table("Additional Table");
        let additionalTableEntry = new DisplayedTextEntry("additional table entry");
        additionalTable.entries.push(additionalTableEntry);

        let entry = new AddTableEntry("Additional Table")
            .addTable(additionalTable)
            .addString(".");

        table.entries.push(entry);
        let fakeDice = new FakeDice().withRollResult(0);

        let result = table.roll(fakeDice);

        expect(table.title).toBe("Test Table");
        expect(result.rolls.length).toBe(2);
        expect(result.rolls[0].table).toBe(table);
        expect(result.rolls[0].entry).toBe(entry);
        expect(result.rolls[1].table).toBe(additionalTable);
        expect(result.rolls[1].entry).toBe(additionalTableEntry);
        expect(result.string).toBe("additional table entry.");
    });

    it('show history concat with two tables given roll 0', () => {
        let table = new Table("Test Table");
        let additionalTable = new Table("Additional Table");
        let additionalTableEntry = new DisplayedTextEntry("additional table entry ");
        additionalTable.entries.push(additionalTableEntry);

        let entry = new AddTableEntry("Additional Table")
            .addTable(additionalTable)
            .addTable(additionalTable);

        table.entries.push(entry);
        let fakeDice = new FakeDice().withRollResult(0);

        let result = table.roll(fakeDice);

        expect(table.title).toBe("Test Table");
        expect(result.rolls.length).toBe(3);
        expect(result.rolls[0].table).toBe(table);
        expect(result.rolls[0].entry).toBe(entry);
        expect(result.rolls[1].table).toBe(additionalTable);
        expect(result.rolls[1].entry).toBe(additionalTableEntry);
        expect(result.rolls[1].table).toBe(additionalTable);
        expect(result.rolls[1].entry).toBe(additionalTableEntry);
        expect(result.string).toBe("additional table entry additional table entry ");
    });
});