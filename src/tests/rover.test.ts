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
          return new Rover(rover.latitude, rover.longitude, Orientation.WEST);
        case Command.RIGHT:
          return new Rover(rover.latitude, rover.longitude, Orientation.EAST);
        case Command.FORWARD:
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
      return new Rover(rover.latitude, rover.longitude, rover.orientation);
    }, this);
  }
}

describe('Rover', () => {
  it('should create a Rover with an initial position and orientation', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.position()).toBe('0:0:N');
  });

  it('should rotate west with a LEFT comand', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.move('L').position()).toBe('0:0:W');
  });

  it('should rotate east with a RIGHT comand', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.move('R').position()).toBe('0:0:E');
  });

  it('should move forward in the current direction with a FORWARD command', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.move('F').position()).toBe('0:1:N');
  });

  it('should handle many commands', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.move('LF').position()).toBe('1:0:W');
  });
});
