import { Coordinate } from '../core/coordinate';
import { NavigatorFactory, Orientation } from '../core/navigator';
import { Rover } from '../core/rover';

describe('Rover', () => {
  let rover: Rover;

  beforeEach(() => {
    const coordinate = Coordinate.create(0, 0);
    const navigator = NavigatorFactory.createNavigator(coordinate, Orientation.NORTH);
    rover = Rover.create(navigator);
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

  it('throws an error if an invalid command is provided', () => {
    expect(() => {
      rover.move('LFB');
    }).toThrow('Unknown command: B');
  });
});
