import {Table} from "../Table";
import {DisplayedTextEntry} from "../DisplayedTextEntry";

export class GalaxyAnomaliesTable extends Table{
    constructor() {
        super("Galaxy Anomalies");
        this.entries = [
            new DisplayedTextEntry("unusual star formation"),
            new DisplayedTextEntry("unusual radio waves"),
            new DisplayedTextEntry("unusual infrared waves"),
            new DisplayedTextEntry("unusual gamma waves"),
            new DisplayedTextEntry("artificial shape"),
            new DisplayedTextEntry("strange messages"),
            new DisplayedTextEntry("just emerged but is older than it should be"),
            new DisplayedTextEntry("unusual gravitational waves"),
            new DisplayedTextEntry("unusual magnetic waves"),
            new DisplayedTextEntry("two galaxies clashed long ago"),
            new DisplayedTextEntry("rift in space-time"),
            new DisplayedTextEntry("unusual dark matter"),
            new DisplayedTextEntry("unusual dark energy"),
            new DisplayedTextEntry("more mass than it should have"),
            new DisplayedTextEntry("lesser mass than it should have"),
            new DisplayedTextEntry("far away"),
            new DisplayedTextEntry("suns are fading"),
            new DisplayedTextEntry("suns are growing"),


        ];
    }

}