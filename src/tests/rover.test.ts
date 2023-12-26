enum Orientation {
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

class Rover {
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
        return new Rover(rover.latitude, rover.longitude + 1, rover.orientation);
      case Orientation.SOUTH:
        return new Rover(rover.latitude, rover.longitude - 1, rover.orientation);
      case Orientation.WEST:
        return new Rover(rover.latitude + 1, rover.longitude, rover.orientation);
      case Orientation.EAST:
        return new Rover(rover.latitude - 1, rover.longitude, rover.orientation);
    }
  }
}

describe('Rover', () => {
  let rover: Rover;

  beforeEach(() => {
    rover = Rover.create(0, 0, Orientation.NORTH);
  });

  it('should create a Rover with an initial position and orientation', () => {
    expect(rover.position()).toBe('0:0:N');
  });

  it('should return the same rover is empty commands provided', () => {
    expect(rover.move('').position()).toBe('0:0:N');
  });

  it('should rotate east with a RIGHT comand', () => {
    expect(rover.move('R').position()).toBe('0:0:E');
  });

  it('should move forward in the current direction with a FORWARD command', () => {
    expect(rover.move('F').position()).toBe('0:1:N');
  });

  it('should handle many commands', () => {
    expect(rover.move('LF').position()).toBe('1:0:W');
  });

  it('should rotate clockwise with LEFT commands', () => {
    expect(rover.move('L').position()).toBe('0:0:W');
    expect(rover.move('LL').position()).toBe('0:0:S');
    expect(rover.move('LLL').position()).toBe('0:0:E');
    expect(rover.move('LLLL').position()).toBe('0:0:N');
  });

  it('should rotate counterclockwise with RIGHT commands', () => {
    expect(rover.move('R').position()).toBe('0:0:E');
    expect(rover.move('RR').position()).toBe('0:0:S');
    expect(rover.move('RRR').position()).toBe('0:0:W');
    expect(rover.move('RRRR').position()).toBe('0:0:N');
  });
});
