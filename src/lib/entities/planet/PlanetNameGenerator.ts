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

export let CultureNameTable: any;
CultureNameTable = {
    arabic: [new PlanetArabicNounsTable(), PlanetArabicNouns],
    greek: [new PlanetGreekNounsTable(), PlanetGreekNouns],
    inuit: [new PlanetInuitNounsTable(), PlanetInuitNouns],
    japanese: [new PlanetJapaneseNounsTable(), PlanetJapaneseNouns],
    latin: [new PlanetLatinNounsTable(), PlanetLatinNouns],
    nordic: [new PlanetNorwegianNounsTable(), PlanetNorwegianNouns],
    sanskrit: [new PlanetSanskritNounsTable(), PlanetSanskritNouns],
}

export class PlanetNameGenerator{
    public static generate(dice?: Dice): string[]{
        if(!dice){
            dice = new Dice();
        }
        let cultureNames = ["arabic", "greek", "inuit", "japanese", "latin", "nordic", "sanskrit"];
        let cultureForNameFirstPart = cultureNames[dice.roll(cultureNames.length)];
        let cultureForNameSecondPart = cultureNames[dice.roll(cultureNames.length)];

        let firstName = CultureNameTable[cultureForNameFirstPart][0].roll(dice).string;

        let firstNameTranslation: string;
        let firstNameMeaning: string;
        if (CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName).transliteration) {
            firstNameTranslation = CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName).transliteration;
        } else {
            firstNameTranslation = firstName;
        }
        firstNameMeaning = CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName).english;

        let secondName = CultureNameTable[cultureForNameSecondPart][0].roll(dice).string;
        let secondNameTranslation = "";
        let secondNameMeaning = "";
        if (CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName).transliteration) {
            secondNameTranslation = CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName).transliteration;
        } else {
            secondNameTranslation = secondName;
        }
        secondNameMeaning = CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName).english;

        let isPrefix = dice.roll(4) === 1;
        let prefixName = "";
        let prefixTranslation = "";
        let prefixMeaning = "";

        if(isPrefix){
            prefixName = new PrefixTable().roll(dice).string;
            let prefix = Prefixes.find((p) => p.prefix === prefixName);
            prefixTranslation =prefix.transliteration;
            prefixMeaning = prefix.meaning;
        }

        let isSuffix = dice.roll(4) === 1;
        let suffixName = "";
        let suffixTranslation = "";
        let suffixMeaning = "";

        if(isSuffix){
            suffixName = new SuffixesTable().roll(dice).string;
            let suffix = Suffixes.find((p) => p.suffix === suffixName);
            suffixTranslation =suffix.transliteration;
            suffixMeaning = suffix.meaning;
        }

        let planetName = prefixName + firstName + secondName + suffixName
        let planetNameTranslation = prefixTranslation + firstNameTranslation + secondNameTranslation + suffixTranslation;
        let planetNameMeaning = prefixMeaning + firstNameMeaning + secondNameMeaning + suffixMeaning;
        return [planetName, planetNameTranslation, planetNameMeaning];
    }
}