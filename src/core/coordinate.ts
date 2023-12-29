export class Coordinate {
  private static readonly planetWidth = 10;
  private static readonly planetHeight = 10;

  constructor(private latitude: number, private longitude: number) { }

  static create(latitude: number, longitude: number) {
    if (latitude < 0 || longitude < 0) {
      throw new Error('Negative values are not allowed');
    }
    if (latitude >= this.planetWidth) {
      throw new Error(`Latitude cannot be bigger than ${Coordinate.planetWidth - 1}`);
    }
    if (longitude >= this.planetHeight) {
      throw new Error(`Longitude cannot be bigger than ${Coordinate.planetHeight - 1}`);
    }
    return new Coordinate(latitude, longitude);
  }

  toString() {
    return `${this.latitude}:${this.longitude}`;
  }

  increaseLatitude() {
    const latitude = this.increaseValue(this.latitude, Coordinate.planetWidth);
    return Coordinate.create(latitude, this.longitude);
  }

  decreaseLatitude() {
    const latitude = this.decreaseValue(this.latitude, Coordinate.planetWidth - 1);
    return Coordinate.create(latitude, this.longitude);
  }

  increaseLongitude() {
    const longitude = this.increaseValue(this.longitude, Coordinate.planetHeight - 1);
    return Coordinate.create(this.latitude, longitude);
  }

  decreaseLongitude() {
    const longitude = this.decreaseValue(this.longitude, Coordinate.planetHeight - 1);
    return Coordinate.create(this.latitude, longitude);
  }

  equals(coordinate: Coordinate) {
    return this.latitude === coordinate.latitude && this.longitude === coordinate.longitude;
  }

  private increaseValue(value: number, limit: number) {
    return value === limit
      ? 0
      : value + 1;
  }

  private decreaseValue(value: number, limit: number) {
    return value === 0
      ? limit
      : value - 1;
  }
}

