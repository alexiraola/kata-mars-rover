import { Coordinate } from "./coordinate";

export enum Orientation {
  NORTH = 'N',
  WEST = 'W',
  EAST = 'E',
  SOUTH = 'S'
};

export class LocationFactory {
  static createLocation(coordinate: Coordinate, orientation: Orientation) {
    switch (orientation) {
      case Orientation.NORTH:
        return new NorthLocation(coordinate);
      case Orientation.WEST:
        return new WestLocation(coordinate);
      case Orientation.EAST:
        return new EastLocation(coordinate);
      case Orientation.SOUTH:
        return new SouthLocation(coordinate);
    }
  }
}

export interface Location {
  position(): string;
  rotateLeft(): Location;
  rotateRight(): Location;
  moveForward(): Location;
}

export class NorthLocation implements Location {
  constructor(private coordinate: Coordinate) { }

  position() {
    return `${this.coordinate}:${Orientation.NORTH}`;
  }

  rotateLeft() {
    return new WestLocation(this.coordinate);
  }

  rotateRight() {
    return new EastLocation(this.coordinate);
  }

  moveForward() {
    return new NorthLocation(this.coordinate.increaseLongitude());
  }
}

export class SouthLocation implements Location {
  constructor(private coordinate: Coordinate) { }

  position() {
    return `${this.coordinate}:${Orientation.SOUTH}`;
  }

  rotateLeft() {
    return new EastLocation(this.coordinate);
  }

  rotateRight() {
    return new WestLocation(this.coordinate);
  }

  moveForward() {
    return new SouthLocation(this.coordinate.decreaseLongitude());
  }
}

export class WestLocation implements Location {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.WEST}`;
  }

  rotateLeft(): Location {
    return new SouthLocation(this.coordinate);
  }

  rotateRight(): Location {
    return new NorthLocation(this.coordinate);
  }

  moveForward(): Location {
    return new WestLocation(this.coordinate.decreaseLatitude());
  }
}

export class EastLocation implements Location {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.EAST}`;
  }

  rotateLeft(): Location {
    return new NorthLocation(this.coordinate);
  }

  rotateRight(): Location {
    return new SouthLocation(this.coordinate);
  }

  moveForward(): Location {
    return new EastLocation(this.coordinate.increaseLatitude());
  }
}


