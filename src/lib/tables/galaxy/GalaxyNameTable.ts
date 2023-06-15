import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";
import {GalaxyDescriptorsTable} from "./GalaxyDescriptorsTable";
import {GalaxyNounsTable} from "./GalaxyNounsTable";
import {ColoursTable} from "../other/ColoursTable";
import {GalaxyTypeTable} from "./GalaxyTypeTable";
import {RandomNameTable} from "../name/RandomNameTable";
import {Dice} from "../Dice";
import {SizeTable} from "../other/SizeTable";

export function NonOrNumberOrLetter(input: string, dice?: Dice){
    let number = 0
    if(dice === undefined){
        number = new Dice().roll(100);
    }
    else{
        number = dice.roll(100);
    }
    if(number > 60){
        return "";
    }
    if(number < 10){
        return " "+number;
    }

    if(number < 30){
        return " A"
    }
    if(number < 40){
        return " B"
    }
    if(number < 50){
        return " C"
    }
    let hexadecimal = number.toString(16).toUpperCase();
    return " "+hexadecimal;
}
export class GalaxyNameTable extends Table{
    constructor() {
        super("Galaxy Names");
        this.entries = [
            new AddTableEntry("{Galaxy Descriptors} + {Galaxy Nouns}")
                .addTable(new GalaxyDescriptorsTable())
                .addString(" ")
                .addTable(new GalaxyNounsTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry("{Galaxy Nouns}")
                .addTable(new GalaxyNounsTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry("{Colours} {Galaxy Nouns}")
                .addTable(new ColoursTable())
                .addString(" ")
                .addTable(new GalaxyNounsTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry()
                .addTable(new ColoursTable())
                .addString(" ")
                .addTable(new GalaxyTypeTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry("{Galaxy Descriptors} {Galaxy Types}")
                .addTable(new GalaxyDescriptorsTable())
                .addString(" ")
                .addTable(new GalaxyTypeTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry("{Random Name} {Galaxy Types}")
                .addTable(new RandomNameTable())
                .addString("'s ")
                .addTable(new GalaxyTypeTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry("{Random Name} {Galaxy Noun}")
                .addTable(new RandomNameTable())
                .addString("'s ")
                .addTable(new GalaxyNounsTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry()
                .addTable(new SizeTable())
                .addString(" ")
                .addTable(new GalaxyTypeTable())
                .addFunction(NonOrNumberOrLetter),
        ];
    }

}