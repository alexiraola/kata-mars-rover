export class Coordinate {
  private planetWidth = 10;
  private planetHeight = 10;

  constructor(private latitude: number, private longitude: number) { }

  toString() {
    return `${this.latitude}:${this.longitude}`;
  }

  increaseLatitude() {
    const latitude = this.increaseValue(this.latitude, this.planetWidth);
    return new Coordinate(latitude, this.longitude);
  }

  decreaseLatitude() {
    const latitude = this.decreaseValue(this.latitude, this.planetWidth - 1);
    return new Coordinate(latitude, this.longitude);
  }

  increaseLongitude() {
    const longitude = this.increaseValue(this.longitude, this.planetHeight - 1);
    return new Coordinate(this.latitude, longitude);
  }

  decreaseLongitude() {
    const longitude = this.decreaseValue(this.longitude, this.planetHeight - 1);
    return new Coordinate(this.latitude, longitude);
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

