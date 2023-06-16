import {LatinSuffixes, LatinSuffixesTable} from "../../tables/other/LatinSuffixesTable";
import {Dice} from "../../tables/Dice";
import {PlanetArabicNouns, PlanetArabicNounsTable} from "../../tables/planet/PlanetArabicNounsTable";
import {PlanetGreekNouns, PlanetGreekNounsTable} from "../../tables/planet/PlanetGreekNounsTable";
import {PlanetInuitNouns, PlanetInuitNounsTable} from "../../tables/planet/PlanetInuitNounsTable";
import {PlanetJapaneseNouns, PlanetJapaneseNounsTable} from "../../tables/planet/PlanetJapaneseNounsTable";
import {PlanetLatinNouns, PlanetLatinNounsTable} from "../../tables/planet/PlanetLatinNounsTable";
import {PlanetNorwegianNouns, PlanetNorwegianNounsTable} from "../../tables/planet/PlanetNordicNounsTable";
import {PlanetSanskritNouns, PlanetSanskritNounsTable} from "../../tables/planet/PlanetSanskritNounsTable";

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
        if (CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName)) {
            firstNameTranslation = CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName).transliteration;
        } else {
            firstNameTranslation = firstName;
        }
        firstNameMeaning = CultureNameTable[cultureForNameFirstPart][1].find((noun) => noun.output === firstName).english;

        let secondName = CultureNameTable[cultureForNameSecondPart][0].roll(dice).string;
        let secondNameTranslation = "";
        let secondNameMeaning = "";
        if (CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName)) {
            secondNameTranslation = CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName).transliteration;
        } else {
            secondNameTranslation = secondName;
        }
        secondNameMeaning = CultureNameTable[cultureForNameSecondPart][1].find((noun) => noun.output === secondName).english;

        let isSuffix = dice.roll(2) === 1;
        let suffix = "";
        let suffixMeaning = "";
        if(isSuffix){
            suffix = new LatinSuffixesTable().roll(dice).string;
            suffixMeaning = LatinSuffixes.find((s) => s.suffix === s)?.meaning;
        }

        let planetName = firstName + secondName + suffix
        let planetNameTranslation = `(${firstNameTranslation} ${secondNameTranslation})`;
        let planetNameMeaning = `(${firstNameMeaning} ${secondNameMeaning}${suffix}${suffix ? suffixMeaning : ""})`;
        return [planetName, planetNameTranslation, planetNameMeaning];
    }
}