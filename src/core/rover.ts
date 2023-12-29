import { CommandFactory } from "./command";
import { Coordinate } from "./coordinate";
import { Orientation, Navigator, NavigatorFactory } from "./navigator";

export class Rover {
  private constructor(private location: Navigator) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    const coordinate = Coordinate.create(latitude, longitude);
    const location = NavigatorFactory.createNavigator(coordinate, orientation);

    return new Rover(location);
  }

  toString() {
    return this.location.toString();
  }

  move(commands: string) {
    return this.getCommands(commands).reduce<Rover>((rover, command) => {
      const location = CommandFactory.createCommand(command).apply(rover.location);
      return new Rover(location);
    }, this);
  }

  private getCommands(commands: string) {
    return commands.split('');
  }
}

