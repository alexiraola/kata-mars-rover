import { Coordinate } from "../core/coordinate";
import { NavigatorFactory, Orientation } from "../core/navigator";

describe('Navigator', () => {
  describe('When facing north', () => {
    it('should have West to the left', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.NORTH);
      expect(navigator.rotateLeft().toString()).toBe('0:0:W');
    });

    it('should have East to the right', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.NORTH);
      expect(navigator.rotateRight().toString()).toBe('0:0:E');
    });

    it('should continue in North and increase longitude when moving forward', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.NORTH);
      expect(navigator.moveForward().toString()).toBe('0:1:N');
    });
  });
  describe('When facing south', () => {
    it('should have East to the left', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.SOUTH);
      expect(navigator.rotateLeft().toString()).toBe('0:0:E');
    });

    it('should have West to the right', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.SOUTH);
      expect(navigator.rotateRight().toString()).toBe('0:0:W');
    });

    it('should continue in South and decrease longitude when moving forward', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.SOUTH);
      expect(navigator.moveForward().toString()).toBe('0:9:S');
    });
  });
  describe('When facing east', () => {
    it('should have North to the left', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.EAST);
      expect(navigator.rotateLeft().toString()).toBe('0:0:N');
    });

    it('should have South to the right', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.EAST);
      expect(navigator.rotateRight().toString()).toBe('0:0:S');
    });

    it('should continue in East and increase latitude when moving forward', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.EAST);
      expect(navigator.moveForward().toString()).toBe('1:0:E');
    });
  });
  describe('When facing west', () => {
    it('should have South to the left', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.WEST);
      expect(navigator.rotateLeft().toString()).toBe('0:0:S');
    });

    it('should have North to the right', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.WEST);
      expect(navigator.rotateRight().toString()).toBe('0:0:N');
    });

    it('should continue in West and decrease latitude when moving forward', () => {
      const navigator = NavigatorFactory.createNavigator(Coordinate.create(0, 0), Orientation.WEST);
      expect(navigator.moveForward().toString()).toBe('9:0:W');
    });
  });
});
