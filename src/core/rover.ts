import { CommandFactory } from "./command";
import { Navigator } from "./navigator";

export class Rover {
  private constructor(private navigator: Navigator) { }

  static create(navigator: Navigator) {
    return new Rover(navigator);
  }

  toString() {
    return this.navigator.toString();
  }

  move(commands: string) {
    return this.getCommands(commands).reduce<Rover>((rover, command) => {
      return Rover.create((command.apply(rover.navigator)));
    }, this);
  }

  private getCommands(commands: string) {
    return commands.split('').map(CommandFactory.createCommand);
  }
}

