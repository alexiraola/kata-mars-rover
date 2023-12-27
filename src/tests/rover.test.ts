import { Orientation } from '../core/location';
import { Rover } from '../core/rover';

describe('Rover', () => {
  let rover: Rover;

  beforeEach(() => {
    rover = Rover.create(0, 0, Orientation.NORTH);
  });

  it('should create a Rover with an initial position and orientation', () => {
    expect(rover.toString()).toBe('0:0:N');
  });

  it('should return the same rover is empty commands provided', () => {
    expect(rover.move('').toString()).toBe('0:0:N');
  });

  it('should handle many commands', () => {
    expect(rover.move('LF').toString()).toBe('9:0:W');
    expect(rover.move('RFF').toString()).toBe('2:0:E');
    expect(rover.move('FRFFR').toString()).toBe('2:1:S');
  });

  it('should rotate clockwise with LEFT commands', () => {
    expect(rover.move('L').toString()).toBe('0:0:W');
    expect(rover.move('LL').toString()).toBe('0:0:S');
    expect(rover.move('LLL').toString()).toBe('0:0:E');
    expect(rover.move('LLLL').toString()).toBe('0:0:N');
  });

  it('should rotate counterclockwise with RIGHT commands', () => {
    expect(rover.move('R').toString()).toBe('0:0:E');
    expect(rover.move('RR').toString()).toBe('0:0:S');
    expect(rover.move('RRR').toString()).toBe('0:0:W');
    expect(rover.move('RRRR').toString()).toBe('0:0:N');
  });

  it('should round the position on the edges', () => {
    expect(rover.move('LFF').toString()).toBe('8:0:W');
    expect(rover.move('LLFF').toString()).toBe('0:8:S');
  });
});
