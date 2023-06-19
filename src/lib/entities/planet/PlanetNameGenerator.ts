import {Suffixes, SuffixesTable} from "../../tables/other/SuffixesTable";
import {Dice} from "../../tables/Dice";
import {PlanetArabicNouns, PlanetArabicNounsTable} from "../../tables/planet/PlanetArabicNounsTable";
import {PlanetGreekNouns, PlanetGreekNounsTable} from "../../tables/planet/PlanetGreekNounsTable";
import {PlanetInuitNouns, PlanetInuitNounsTable} from "../../tables/planet/PlanetInuitNounsTable";
import {PlanetJapaneseNouns, PlanetJapaneseNounsTable} from "../../tables/planet/PlanetJapaneseNounsTable";
import {PlanetLatinNouns, PlanetLatinNounsTable} from "../../tables/planet/PlanetLatinNounsTable";
import {PlanetNorwegianNouns, PlanetNorwegianNounsTable} from "../../tables/planet/PlanetNordicNounsTable";
import {PlanetSanskritNouns, PlanetSanskritNounsTable} from "../../tables/planet/PlanetSanskritNounsTable";
import {Prefixes, PrefixTable} from "../../tables/other/PrefixTable";
import {PlanetChineseNouns, PlanetChineseNounsTable} from "../../tables/planet/PlanetChineseNounsTable";
import {PlanetArabicAdjectives, PlanetArabicAdjectivesTable} from "../../tables/planet/PlanetArabicAdjectivesTable";
import {
    PlanetJapaneseAdjectives,
    PlanetJapaneseAdjectivesTable
} from "../../tables/planet/PlanetJapaneseAdjectivesTable";
import {
    PlanetSanskritAdjectives,
    PlanetSanskritAdjectivesTable
} from "../../tables/planet/PlanetSanskritAdjectivesTable";
import {PlanetChineseAdjectives, PlanetChineseAdjectivesTable} from "../../tables/planet/PlanetChineseAdjectivesTable";
import {ComplexName} from "../name/ComplexName";
import {PlanetLatinAdjectives, PlanetLatinAdjectivesTable} from "../../tables/planet/PlanetLatinAdjectivesTable";
import {PlanetDarkSyllablesTable} from "../../tables/planet/PlanetDarkSyllablesTable";
import {PlanetDarkPrefixesTable} from "../../tables/planet/PlanetDarkPrefixesTable";
import {PlanetDarkSuffixesTable} from "../../tables/planet/PlanetDarkSuffixesTable";

export let CultureNameTable: any;
CultureNameTable = {
    arabic: [new PlanetArabicNounsTable(), PlanetArabicNouns, new PlanetArabicAdjectivesTable(), PlanetArabicAdjectives],
    greek: [new PlanetGreekNounsTable(), PlanetGreekNouns],
    inuit: [new PlanetInuitNounsTable(), PlanetInuitNouns],
    japanese: [new PlanetJapaneseNounsTable(), PlanetJapaneseNouns, new PlanetJapaneseAdjectivesTable(), PlanetJapaneseAdjectives],
    latin: [new PlanetLatinNounsTable(), PlanetLatinNouns, new PlanetLatinAdjectivesTable(), PlanetLatinAdjectives],
    nordic: [new PlanetNorwegianNounsTable(), PlanetNorwegianNouns],
    sanskrit: [new PlanetSanskritNounsTable(), PlanetSanskritNouns, new PlanetSanskritAdjectivesTable(), PlanetSanskritAdjectives],
    chinese: [new PlanetChineseNounsTable(), PlanetChineseNouns, new PlanetChineseAdjectivesTable(), PlanetChineseAdjectives],
}

export class PlanetNameGenerator{
    public static generate(dice?: Dice): ComplexName{
        if(!dice){
            dice = new Dice();
        }
        let complexName = new ComplexName();

        let isDark = dice.roll(5) === 1;

        if(isDark){
            complexName = this.generateDarkName(dice);
        }else{
            complexName = this.addPrefix(dice, complexName);

            complexName = this.addAdjective(dice, complexName);
            console.log("with adjective: " +complexName.getTransliteration())

            complexName = this.addNouns(dice, complexName);
            console.log("with noun: " +complexName.getTransliteration())

            complexName = this.addSuffix(dice, complexName);
        }
        return complexName;

    }

    public static generateDarkName(dice?: Dice){
        if(!dice){
            dice = new Dice();
        }
        let complexName = new ComplexName();
        const syllableCount = dice.rollInterval(1,2)

        let name = "";

        name = this.addSyllablesWithoutSame(syllableCount, dice, name);

        let hasPrefix = dice.roll(2) === 1;
        if (hasPrefix) {
            name = new PlanetDarkPrefixesTable().roll(dice).string + name;
        } else {
            name = name + new PlanetDarkSuffixesTable().roll(dice).string;
        }

        return complexName.with(name, "-", "-");
    }

    private static addSyllablesWithoutSame(syllableCount, dice: Dice, name: string) {
        let previousPart = "";
        for (let i = 0; i < syllableCount; i++) {
            let part;
            do {
                part = new PlanetDarkSyllablesTable().roll(dice).string;
            } while (part === previousPart);
            name += part;
            previousPart = part;
        }
        return name;
    }

    private static addSuffix(dice: Dice, complexName: ComplexName) {
        let isSuffix = dice.roll(5) === 1;
        if (isSuffix) {
            let suffixName = new SuffixesTable().roll(dice).string;
            let suffix = Suffixes.find((p) => p.suffix === suffixName);
            let suffixTranslation = suffix.transliteration;
            let suffixMeaning = suffix.meaning;
            complexName = complexName.with(suffixName, suffixTranslation, suffixMeaning);
        }
        return complexName;
    }

    private static addAdjective(dice: Dice, complexName: ComplexName) {
        let numberOfAdjectives = dice.roll(2);
        if (numberOfAdjectives === 1) {
            console.log("Adding adjective")
            let adjectieCultures = this.getCulturesWithAdjectives(CultureNameTable);
            let entry = this.randomEntryAdjectiveFrom(adjectieCultures, dice);
            console.log(entry);
            let adjective = entry.output;
            console.log("Adjective: " + adjective)
            let transliteration;
            if(entry.transliteration){
                transliteration = entry.transliteration;
            }else{
                transliteration = adjective;
            }
            let meaning = entry.english;
            complexName = complexName.with(adjective, transliteration, meaning);
        }
        return complexName;
    }

    private static addNouns(dice: Dice, complexName: ComplexName) {
        let randomNumber = dice.roll(20);
        let numberOfNouns = 1;
        if (randomNumber >= 18) {
            numberOfNouns = 2;
        }

        for (let i = 0; i < numberOfNouns; i++) {
            let entry = this.randomEntry(dice);
            let noun = entry.output;
            let transliteration = "";
            if(entry.transliteration){
                transliteration = entry.transliteration;
            }else{
                transliteration = noun;
            }
            let meaning = entry.english;

            complexName = complexName.with(noun, transliteration, meaning);
        }
        return complexName;
    }

    private static addPrefix(dice: Dice, complexName: ComplexName) {
        let isPrefix = dice.roll(5) === 1;
        if (isPrefix) {
            let prefixName = new PrefixTable().roll(dice).string;
            let prefix = Prefixes.find((p) => p.prefix === prefixName);
            let prefixTranslation = prefix.transliteration;
            let prefixMeaning = prefix.meaning;
            complexName = complexName.with(prefixName, prefixTranslation, prefixMeaning);
        }
        return complexName;
    }

    private static getCulturesWithAdjectives(cultureTable) {
        let culturesWithAdjectives = [];

        for(let culture in cultureTable) {
            if(cultureTable[culture].length === 4) {
                culturesWithAdjectives.push(culture);
            }
        }

        return culturesWithAdjectives;
    }

    private static randomEntry(dice: Dice) {
        let cultureNames = Object.keys(CultureNameTable).length;
        let randomCultureIndex = dice.roll(cultureNames);
        let cultureName = Object.keys(CultureNameTable)[randomCultureIndex];
        let table = CultureNameTable[cultureName][0];
        let noun = table.roll(dice).string;
        let entry = CultureNameTable[cultureName][1].find((n) => n.output === noun);
        return entry;
    }

    private static randomEntryAdjectiveFrom(cultureNames: string[], dice: Dice) {
        let randomCultureIndex = dice.roll(cultureNames.length);
        let cultureName = cultureNames[randomCultureIndex];
        let table = CultureNameTable[cultureName][2];
        console.log("adjective table: ");
        console.log(table);
        let adjective = table.roll(dice).string;
        console.log("adjective: " + adjective);
        let entry = CultureNameTable[cultureName][3].find((n) => n.output === adjective);
        console.log("entry: ");
        console.log(entry);
        return entry;
    }
}