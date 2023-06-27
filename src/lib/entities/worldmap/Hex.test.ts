import { test, it, expect } from 'vitest'
import {createGrid, getField, getHexNeighbors, HexField, HexGrid, setFieldTerrain} from "./Hex";


test('Creating a grid', () => {
    const width = 10
    const height = 10
    const grid = createGrid(width, height)
    expect(grid).toBeDefined()
})

test('Getting and setting field terrain', () => {
    const width = 10
    const height = 10
    const grid = new HexGrid(width, height)
    const x = 5
    const y = 5
    const terrainType = 3
    setFieldTerrain(grid, x, y, terrainType)
    const field = getField(grid, x, y)
    expect(field).toBeDefined();
    if(field) {
        expect(field.terrainType).toBe(terrainType)
    }

})

test('Getting hex neighbors', () => {
    const width = 10
    const height = 10
    const grid = new HexGrid(width, height)
    const x = 5
    const y = 5
    const neighbors = getHexNeighbors(grid, x, y)
    expect(neighbors.length).toBe(6)

    for (const neighbor of neighbors) {
        expect(neighbor).toBeInstanceOf(HexField);
    }
})

test('Getting hex neighbors on grid edge', () => {
    const width = 10
    const height = 10
    const grid = new HexGrid(width, height)
    const x = 0
    const y = 0
    const neighbors = getHexNeighbors(grid, x, y)
    expect(neighbors.length).toBe(3)
    for (const neighbor of neighbors) {
        expect(neighbor).toBeInstanceOf(HexField);
    }
})
