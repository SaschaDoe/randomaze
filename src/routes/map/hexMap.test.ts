import {describe} from "vitest";
import {HexMap} from "./hexMap";

describe("HexMap", () => {
    it("should have one hexField given 1 width and 1 height", () => {
      let hexMap = new HexMap().withWidth(1).withHeight(1);
        hexMap.generate();
        expect(hexMap.hexesAsArray.length).toEqual(1);
    });
});