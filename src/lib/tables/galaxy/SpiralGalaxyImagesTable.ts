import {Table} from "../Table";
export const SpiralGalaxyImages = ["AndromedaGalaxy.png", "BlackEyeGalaxy.png",  "FireworksGalaxy.png","FireworksGalaxy2.png",
    "SpinwheelGalaxy.png", "WhirlpoolGalaxy.png", "spiralGalaxy2.png"];
export class SpiralGalaxyImagesTable extends Table{
    constructor() {
        super("Spiral Galaxy Images");
        this.ArrayAsTableEntries(SpiralGalaxyImages);
    }

}