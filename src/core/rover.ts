import { Coordinate } from "./coordinate";
import { EastPosition, NorthPosition, Orientation, Location, SouthPosition, WestPosition } from "./location";

enum Command {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
};
export class Rover {
  private constructor(private location: Location) { }

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

