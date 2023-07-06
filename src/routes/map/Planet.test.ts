import {OceanPlanet} from "./Planet";

describe('OceanPlanet', () => {
    let oceanPlanet = new OceanPlanet(20);
    let baseWaterLevel = 0.4;
    it('Variance applied on OceanPlanet water level', () => {
        expect(oceanPlanet.waterLevel).not.toBe(baseWaterLevel);
    })

    // Base values for OceanPlanet
    it('Base values match OceanPlanet', () => {
        expect(oceanPlanet.currentPlanetType).toBe('ocean');
        expect(oceanPlanet.baseTemperature).toBeLessThanOrEqual(20 + 20 * 0.2);
        expect(oceanPlanet.baseTemperature).toBeGreaterThanOrEqual(20 - 20 * 0.2);
    })

})