import { Coordinate } from "./coordinate";
import { Orientation, Location, LocationFactory } from "./location";

enum Command {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
};
export class Rover {
  private constructor(private location: Location) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    const coordinate = new Coordinate(latitude, longitude);
    const location = LocationFactory.createLocation(coordinate, orientation);

    return new Rover(location);
  }

  toString() {
    return this.location.position();
  }

  move(commands: string) {
    return commands.split('').reduce<Rover>((rover, command) => {
      switch (command) {
        case Command.LEFT:
          return new Rover(rover.location.rotateLeft());
        case Command.RIGHT:
          return new Rover(rover.location.rotateRight());
        case Command.FORWARD:
          return new Rover(rover.location.moveForward());
      }
      return rover;
    }, this);
  }
}

