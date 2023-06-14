import {Table} from "../Table";

export const OtherGalaxyImages = ["CigarGalaxy.png","MedusaGalaxy.png","RedshiftGalaxy.png","SpiralGalaxy.png",
    "HockeystickGalaxy.png"
];
export class OtherGalaxyImagesTable extends Table{
    constructor() {
        super("Other Galaxy Images");
        this.ArrayAsTableEntries(OtherGalaxyImages);
    }

}