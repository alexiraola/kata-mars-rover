import { CommandFactory } from "./command";
import { Coordinate } from "./coordinate";
import { Orientation, Navigator, NavigatorFactory } from "./navigator";

export class Rover {
  private constructor(private navigator: Navigator) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    const coordinate = Coordinate.create(latitude, longitude);
    const navigator = NavigatorFactory.createNavigator(coordinate, orientation);

    return new Rover(navigator);
  }

  toString() {
    return this.navigator.toString();
  }

  move(commands: string) {
    return this.getCommands(commands).reduce<Rover>((rover, command) => {
      const navigator = CommandFactory.createCommand(command).apply(rover.navigator);
      return new Rover(navigator);
    }, this);
  }

  private getCommands(commands: string) {
    return commands.split('');
  }
}

