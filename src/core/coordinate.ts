export class Coordinate {
  private maxLatitude = 9;
  private maxLongitude = 9;

  constructor(private latitude: number, private longitude: number) { }

  toString() {
    return `${this.latitude}:${this.longitude}`;
  }

  increaseLatitude() {
    const latitude = this.latitude === this.maxLatitude
      ? 0
      : this.latitude + 1;

    return new Coordinate(latitude, this.longitude);
  }

  decreaseLatitude() {
    const latitude = this.latitude === 0
      ? this.maxLatitude
      : this.latitude - 1

    return new Coordinate(latitude, this.longitude);
  }

  increaseLongitude() {
    const longitude = this.longitude === this.maxLongitude
      ? 0
      : this.longitude + 1;

    return new Coordinate(this.latitude, longitude);
  }

  decreaseLongitude() {
    const longitude = this.longitude === 0
      ? this.maxLongitude
      : this.longitude - 1;

    return new Coordinate(this.latitude, longitude);
  }
}

