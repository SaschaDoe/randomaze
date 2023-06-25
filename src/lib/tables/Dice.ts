export class Dice{

    //Roll from 0 to max exlusively
    roll(max: number) {
        return Math.floor(Math.random() * max);
    }

    //Roll from min to max inclusively
    rollInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    rollFloat(max: number) {
        return Math.random() * max;
    }

    rollRandom(){
        return Math.random();
    }
}