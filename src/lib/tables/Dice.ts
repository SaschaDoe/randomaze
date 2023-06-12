export class Dice {
    roll(max: number) {
        return Math.floor(Math.random() * max);
    }

    rollFloat(max: number) {
        return Math.random() * max;
    }
}