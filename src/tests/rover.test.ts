enum Orientation {
  NORTH = 'N',
  WEST = 'W',
  EAST = 'E',
  SOUTH = 'S'
};

class Rover {
  private constructor(private latitude: number, private longitude: number, private orientation: Orientation) { }

  static create(latitude: number, longitude: number, orientation: Orientation) {
    return new Rover(latitude, longitude, orientation);
  }

  position() {
    return `${this.latitude}:${this.longitude}:${this.orientation}`;
  }
}

describe('Rover', () => {
  it('should create a Rover with an initial position and orientation', () => {
    const rover = Rover.create(0, 0, Orientation.NORTH);

    expect(rover.position()).toBe('0:0:N');
  });
});
