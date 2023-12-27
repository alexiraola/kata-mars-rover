export enum Orientation {
  NORTH = 'N',
  WEST = 'W',
  EAST = 'E',
  SOUTH = 'S'
};

enum Command {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
};

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

interface Position {
  position(): string;
  rotateLeft(): Position;
  rotateRight(): Position;
  moveForward(): Position;
}

export class NorthPosition implements Position {
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

export class SouthPosition implements Position {
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

export class WestPosition implements Position {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.WEST}`;
  }
  rotateLeft(): Position {
    return new SouthPosition(this.coordinate);
  }
  rotateRight(): Position {
    return new NorthPosition(this.coordinate);
  }
  moveForward(): Position {
    return new WestPosition(this.coordinate.decreaseLatitude());
  }
}

export class EastPosition implements Position {
  constructor(private coordinate: Coordinate) { }

  position(): string {
    return `${this.coordinate}:${Orientation.EAST}`;
  }
  rotateLeft(): Position {
    return new NorthPosition(this.coordinate);
  }
  rotateRight(): Position {
    return new SouthPosition(this.coordinate);
  }
  moveForward(): Position {
    return new EastPosition(this.coordinate.increaseLatitude());
  }
}

export class Rover {
  private constructor(private pos: Position) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    const coordinate = new Coordinate(latitude, longitude);

    switch (orientation) {
      case Orientation.NORTH:
        return new Rover(new NorthPosition(coordinate));
      case Orientation.WEST:
        return new Rover(new WestPosition(coordinate));
      case Orientation.EAST:
        return new Rover(new EastPosition(coordinate));
      case Orientation.SOUTH:
        return new Rover(new SouthPosition(coordinate));
    }
  }

  position() {
    return this.pos.position();
  }

  move(commands: string) {
    return commands.split('').reduce<Rover>((rover, command) => {
      switch (command) {
        case Command.LEFT:
          return new Rover(rover.pos.rotateLeft());
        case Command.RIGHT:
          return new Rover(rover.pos.rotateRight());
        case Command.FORWARD:
          return new Rover(rover.pos.moveForward());
      }
      return rover;
    }, this);
  }
}


