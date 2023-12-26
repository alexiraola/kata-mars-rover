import { argv0 } from "process";

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

export class Rover {
  private constructor(private latitude: number, private longitude: number, private orientation: Orientation) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    return new Rover(latitude, longitude, orientation);
  }

  position() {
    return `${this.latitude}:${this.longitude}:${this.orientation}`;
  }

  move(commands: string) {
    return commands.split('').reduce<Rover>((rover, command) => {
      switch (command) {
        case Command.LEFT:
          return this.moveLeft(rover);
        case Command.RIGHT:
          return this.moveRight(rover);
        case Command.FORWARD:
          return this.moveForward(rover);
      }
      return rover;
    }, this);
  }

  private moveLeft(rover: Rover) {
    switch (rover.orientation) {
      case Orientation.NORTH:
        return new Rover(rover.latitude, rover.longitude, Orientation.WEST);
      case Orientation.WEST:
        return new Rover(rover.latitude, rover.longitude, Orientation.SOUTH);
      case Orientation.EAST:
        return new Rover(rover.latitude, rover.longitude, Orientation.NORTH);
      case Orientation.SOUTH:
        return new Rover(rover.latitude, rover.longitude, Orientation.EAST);
    }
  }

  private moveRight(rover: Rover) {
    switch (rover.orientation) {
      case Orientation.NORTH:
        return new Rover(rover.latitude, rover.longitude, Orientation.EAST);
      case Orientation.WEST:
        return new Rover(rover.latitude, rover.longitude, Orientation.NORTH);
      case Orientation.EAST:
        return new Rover(rover.latitude, rover.longitude, Orientation.SOUTH);
      case Orientation.SOUTH:
        return new Rover(rover.latitude, rover.longitude, Orientation.WEST);
    }
  }

  private moveForward(rover: Rover) {
    switch (rover.orientation) {
      case Orientation.NORTH:
        return new Rover(rover.latitude, rover.increaseLongitude(), rover.orientation);
      case Orientation.SOUTH:
        return new Rover(rover.latitude, rover.decreaseLongitude(), rover.orientation);
      case Orientation.EAST:
        return new Rover(rover.increaseLatitude(), rover.longitude, rover.orientation);
      case Orientation.WEST:
        return new Rover(rover.decreaseLatitude(), rover.longitude, rover.orientation);
    }
  }

  private increaseLatitude() {
    return this.latitude === 9
      ? 0
      : this.latitude + 1
  }

  private decreaseLatitude() {
    return this.latitude === 0
      ? 9
      : this.latitude - 1
  }

  private increaseLongitude() {
    return this.longitude === 9
      ? 0
      : this.longitude + 1
  }

  private decreaseLongitude() {
    return this.longitude === 0
      ? 9
      : this.longitude - 1
  }
}


