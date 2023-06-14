import {Table} from "../Table";
export const SpiralGalaxyImages = ["AndromedaGalaxy.png", "BlackEyeGalaxy.png",  "FireworksGalaxy.png","FireworksGalaxy2.png",
    "ObjectGalaxy.png",  "SpinwheelGalaxy.png", "WhirlpoolGalaxy.png"];
export class SpiralGalaxyImagesTable extends Table{
    constructor() {
        super("Spiral Galaxy Images");
        this.ArrayAsTableEntries(SpiralGalaxyImages);
    }

}