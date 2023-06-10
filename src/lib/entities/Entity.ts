import {IDGenerator} from "./IDGenerator";

export abstract class Entity{
    public readonly id: number;

    constructor() {
        this.id = IDGenerator.getInstance().getNextId();
    }
}