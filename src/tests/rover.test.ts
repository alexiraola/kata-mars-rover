import { Rover, Orientation } from '../core/rover';

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

  it('should handle many commands', () => {
    expect(rover.move('LF').position()).toBe('9:0:W');
    expect(rover.move('RFF').position()).toBe('2:0:E');
    expect(rover.move('FRFFR').position()).toBe('2:1:S');
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

  it('should round the position on the edges', () => {
    expect(rover.move('LFF').position()).toBe('8:0:W');
    expect(rover.move('LLFF').position()).toBe('0:8:S');
  });
});
