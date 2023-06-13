import {Entity} from "../Entity";
import {Culture} from "../culture/Culture";

export class Character extends Entity {
    culture: Culture;
    gender: string;
    name: string;
}