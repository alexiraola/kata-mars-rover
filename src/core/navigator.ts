import { Coordinate } from "./coordinate";

export enum Orientation {
  NORTH = 'N',
  WEST = 'W',
  EAST = 'E',
  SOUTH = 'S'
};

export class NavigatorFactory {
  static createNavigator(coordinate: Coordinate, orientation: Orientation): Navigator {
    switch (orientation) {
      case Orientation.NORTH:
        return new NorthFacingNavigator(coordinate);
      case Orientation.WEST:
        return new WestFacingNavigator(coordinate);
      case Orientation.EAST:
        return new EastFacingNavigator(coordinate);
      case Orientation.SOUTH:
        return new SouthFacingNavigator(coordinate);
    }
  }
}

export interface Navigator {
  toString(): string;
  rotateLeft(): Navigator;
  rotateRight(): Navigator;
  moveForward(): Navigator;
}

class NorthFacingNavigator implements Navigator {
  constructor(private coordinate: Coordinate) { }

  toString() {
    return `${this.coordinate}:${Orientation.NORTH}`;
  }

  rotateLeft() {
    return new WestFacingNavigator(this.coordinate);
  }

  rotateRight() {
    return new EastFacingNavigator(this.coordinate);
  }

  moveForward() {
    return new NorthFacingNavigator(this.coordinate.increaseLongitude());
  }
}

class SouthFacingNavigator implements Navigator {
  constructor(private coordinate: Coordinate) { }

  toString() {
    return `${this.coordinate}:${Orientation.SOUTH}`;
  }

  rotateLeft() {
    return new EastFacingNavigator(this.coordinate);
  }

  rotateRight() {
    return new WestFacingNavigator(this.coordinate);
  }

  moveForward() {
    return new SouthFacingNavigator(this.coordinate.decreaseLongitude());
  }
}

class WestFacingNavigator implements Navigator {
  constructor(private coordinate: Coordinate) { }

  toString(): string {
    return `${this.coordinate}:${Orientation.WEST}`;
  }

  rotateLeft(): Navigator {
    return new SouthFacingNavigator(this.coordinate);
  }

  rotateRight(): Navigator {
    return new NorthFacingNavigator(this.coordinate);
  }

  moveForward(): Navigator {
    return new WestFacingNavigator(this.coordinate.decreaseLatitude());
  }
}

class EastFacingNavigator implements Navigator {
  constructor(private coordinate: Coordinate) { }

  toString(): string {
    return `${this.coordinate}:${Orientation.EAST}`;
  }

  rotateLeft(): Navigator {
    return new NorthFacingNavigator(this.coordinate);
  }

  rotateRight(): Navigator {
    return new SouthFacingNavigator(this.coordinate);
  }

  moveForward(): Navigator {
    return new EastFacingNavigator(this.coordinate.increaseLatitude());
  }
}


