import { Navigator } from './navigator';

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
    throw new Error(`Unknown command: ${command}`);
  }
}

export interface Command {
  apply(location: Navigator): Navigator;
}

class LeftCommand implements Command {
  apply(location: Navigator) {
    return location.rotateLeft();
  }
}

class RightCommand implements Command {
  apply(location: Navigator) {
    return location.rotateRight();
  }
}

class ForwardCommand implements Command {
  apply(location: Navigator) {
    return location.moveForward();
  }
}
