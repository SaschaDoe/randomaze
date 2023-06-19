import {Table} from "../Table";

export let SolarSystemStages = [
    {
        name: "molecular cloud",
        description: "This is a dense region of interstellar dust and gas, primarily hydrogen. At some point something triggers the cloud to collapse, such as a shockwave from a nearby supernova.",
        minDuration: "100",
        maxDuration: "100000"
    },
    {
        name: "protostar",
        description: "The collapse of the molecular cloud under its own gravity leads to the formation of a protostar and a surrounding disk of material, known as a protoplanetary disk.",
        minDuration: "1",
        maxDuration: "10"
    },
    {
        name: "planet formation",
        description: "Over time, solid particles in the protoplanetary disk begin to collide and stick together, forming planetesimals. These then collide and merge to form protoplanets, and eventually, planets. ",
        minDuration: "1",
        maxDuration: "100",
    },
    {
        name: "stable phase",
        description: "The protostar continues to contract and heat up until it begins nuclear fusion, at which point it becomes a main sequence star. The planets and other bodies orbit stably around the star during this time.",
        minDuration: "1000",
        maxDuration: "10000",
    },
    {
        name: "red giant",
        description: "Once the star has exhausted the hydrogen in its core, it will start to burn helium and expand significantly in size, becoming a red giant or red supergiant. ",
        minDuration: "100",
        maxDuration: "1000",
    },
    {
        name: "white dwarf",
        description: "For stars like the Sun, after the red giant phase, they will eject their outer layers into space, forming a planetary nebula, and leave behind a hot, dense core called a white dwarf. ",
        minDuration: "1",
        maxDuration: "2",
    },
    {
        name: "black dwarf",
        description: "After a very long time, a white dwarf will cool enough to become a black dwarf.",
        minDuration: "1000000",
        maxDuration: "100000000",
    }
];

export class SolarSystemStageTable extends Table{
    constructor() {
        super("Solar System Stages");
        let phaseNames = SolarSystemStages.map((phase) => phase.name);
        this.ArrayAsTableEntries(phaseNames);
    }

}