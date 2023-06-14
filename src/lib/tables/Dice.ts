export class Dice {
    roll(max: number) {
        return Math.floor(Math.random() * max);
    }

    rollInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    rollFloat(max: number) {
        return Math.random() * max;
    }
}