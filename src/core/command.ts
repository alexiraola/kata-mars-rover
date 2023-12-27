import { Location } from './location';

export enum CommandType {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
};

export class CommandFactory {
  static createCommand(command: string) {
    switch (command) {
      case CommandType.LEFT:
        return new LeftCommand();
      case CommandType.RIGHT:
        return new RightCommand();
      case CommandType.FORWARD:
        return new ForwardCommand();
    }
  }
}

export interface Command {
  apply(location: Location): Location;
}

class LeftCommand implements Command {
  apply(location: Location) {
    return location.rotateLeft();
  }
}

class RightCommand implements Command {
  apply(location: Location) {
    return location.rotateRight();
  }
}

class ForwardCommand implements Command {
  apply(location: Location) {
    return location.moveForward();
  }
}
