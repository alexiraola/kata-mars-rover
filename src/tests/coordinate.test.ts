import { Coordinate } from "../core/coordinate"

describe('Coordinate', () => {
  it('it does not allow negative values for latitude', () => {
    expect(() => Coordinate.create(-1, 0)).toThrow('Negative values are not allowed');
  });

  it('it does not allow negative values for longitude', () => {
    expect(() => Coordinate.create(0, -1)).toThrow('Negative values are not allowed');
  });
})
