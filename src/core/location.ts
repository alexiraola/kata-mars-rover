import { Coordinate } from "./coordinate";

export enum Orientation {
  NORTH = 'N',
  WEST = 'W',
  EAST = 'E',
  SOUTH = 'S'
};

export interface Location {
  position(): string;
  rotateLeft(): Location;
  rotateRight(): Location;
  moveForward(): Location;
}

export class NorthPosition implements Location {
  constructor(private coordinate: Coordinate) { }

  position() {
    return `${this.coordinate}:${Orientation.NORTH}`;
  }

  rotateLeft() {
    return new WestPosition(this.coordinate);
  }

  rotateRight() {
    return new EastPosition(this.coordinate);
  }

  moveForward() {
    return new NorthPosition(this.coordinate.increaseLongitude());
  }
}

export class SouthPosition implements Location {
  constructor(private coordinate: Coordinate) { }

  position() {
    return `${this.coordinate}:${Orientation.SOUTH}`;
  }

  rotateLeft() {
    return new EastPosition(this.coordinate);
  }

  rotateRight() {
    return new WestPosition(this.coordinate);
  }

  moveForward() {
    return new SouthPosition(this.coordinate.decreaseLongitude());
  }
}

export class WestPosition implements Location {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.WEST}`;
  }
  rotateLeft(): Location {
    return new SouthPosition(this.coordinate);
  }
  rotateRight(): Location {
    return new NorthPosition(this.coordinate);
  }
  moveForward(): Location {
    return new WestPosition(this.coordinate.decreaseLatitude());
  }
}

export class EastPosition implements Location {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.EAST}`;
  }
  rotateLeft(): Location {
    return new NorthPosition(this.coordinate);
  }
  rotateRight(): Location {
    return new SouthPosition(this.coordinate);
  }
  moveForward(): Location {
    return new EastPosition(this.coordinate.increaseLatitude());
  }
}


