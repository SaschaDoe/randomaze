import {describe, it, expect} from "vitest";
import {Campaign, getEntityTypes} from "./Campaign";

describe("Campaign", () => {
    it("should give a list of entity types",  () => {
        let campaign = new Campaign();
        let entityTypes = getEntityTypes(campaign);
        expect(entityTypes).toEqual(["party", "cultures", "galaxies"]);
    });
});