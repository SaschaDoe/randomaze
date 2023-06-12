import {Entity} from "../Entity";
import {Culture} from "./Culture";

export class Character extends Entity {
    culture: Culture;
    gender: string;
    name: string;
}