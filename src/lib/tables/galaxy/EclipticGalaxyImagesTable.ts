import {Table} from "../Table";

export const EclipticGalaxyImages = ["Ecliptic1.png", "Ecliptic2.png", "ObjectGalaxy.png", "AndromedaGalaxy.png"
];
export class EclipticGalaxyImagesTable extends Table{
    constructor() {
        super("Ecliptic Galaxy Images");
        this.ArrayAsTableEntries(EclipticGalaxyImages);
    }

}