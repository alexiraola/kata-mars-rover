import { Coordinate } from "../core/coordinate"

describe('Coordinate', () => {
  it('it does not allow negative values for latitude', () => {
    expect(() => Coordinate.create(-1, 0)).toThrow('Negative values are not allowed');
  });

  it('it does not allow negative values for longitude', () => {
    expect(() => Coordinate.create(0, -1)).toThrow('Negative values are not allowed');
  });

  it('values outside of world are not allowed', () => {
    expect(() => Coordinate.create(10, 0)).toThrow('Latitude cannot be bigger than 9');
    expect(() => Coordinate.create(0, 10)).toThrow('Longitude cannot be bigger than 9');
  });

  it('increases latitude by one', () => {
    const coordinate = Coordinate.create(0, 0);

    expect(coordinate.increaseLatitude().equals(Coordinate.create(1, 0))).toBeTruthy();
  });

  it('increases longitude by one', () => {
    const coordinate = Coordinate.create(0, 0);

    expect(coordinate.increaseLongitude().equals(Coordinate.create(0, 1))).toBeTruthy();
  });

  it('decreases latitude by one', () => {
    const coordinate = Coordinate.create(1, 0);

    expect(coordinate.decreaseLatitude().equals(Coordinate.create(0, 0))).toBeTruthy();
  });

  it('decreases longitude by one', () => {
    const coordinate = Coordinate.create(0, 1);

    expect(coordinate.decreaseLongitude().equals(Coordinate.create(0, 0))).toBeTruthy();
  });

  it('starts the latitude from 0 when it reaches the world limit', () => {
    const coordinate = Coordinate.create(9, 1);

    expect(coordinate.increaseLatitude().equals(Coordinate.create(0, 1))).toBeTruthy();
  });

  it('starts the longitude from 0 when it reaches the world limit', () => {
    const coordinate = Coordinate.create(9, 9);

    expect(coordinate.increaseLongitude().equals(Coordinate.create(9, 0))).toBeTruthy();
  });

  it('starts the latitude from limit when it reaches the world start', () => {
    const coordinate = Coordinate.create(0, 1);

    expect(coordinate.decreaseLatitude().equals(Coordinate.create(9, 1))).toBeTruthy();
  });

  it('starts the longitude from limit when it reaches the world start', () => {
    const coordinate = Coordinate.create(1, 0);

    expect(coordinate.decreaseLongitude().equals(Coordinate.create(1, 9))).toBeTruthy();
  });
})
