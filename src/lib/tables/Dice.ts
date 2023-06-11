export class Dice{
    public readonly sides: number;
    constructor(sides?: number) {
        if(sides === undefined) sides = 6;
        this.sides = sides;
    }
    public roll(): number {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}