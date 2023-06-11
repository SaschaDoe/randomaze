import {Dice} from "./Dice";

export class FakeDice extends Dice{
    private rollResult: number;
    withRollResult(rollResult: number): FakeDice {
        this.rollResult = rollResult;
        return this;
    }

    public roll(): number {
        return this.rollResult;
    }
}