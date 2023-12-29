import { Navigator } from './navigator';

export enum CommandType {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
};

export class CommandFactory {
  static createCommand(command: string): Command {
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
  apply(navigator: Navigator): Navigator;
}

class LeftCommand implements Command {
  apply(navigator: Navigator) {
    return navigator.rotateLeft();
  }
}

class RightCommand implements Command {
  apply(navigator: Navigator) {
    return navigator.rotateRight();
  }
}

class ForwardCommand implements Command {
  apply(navigator: Navigator) {
    return navigator.moveForward();
  }
}
