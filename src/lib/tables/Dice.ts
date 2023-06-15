export class Dice{

    //Roll from 0 to max exlusively
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