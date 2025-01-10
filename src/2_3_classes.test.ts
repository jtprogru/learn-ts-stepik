import { Point, getLength, Lengthy } from './2_3_classes';

describe('Point class', () => {
    it('should initialize with default values', () => {
        const point = new Point();
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
    });

    it('should initialize with given values', () => {
        const point = new Point(3, 4);
        expect(point.x).toBe(3);
        expect(point.y).toBe(4);
    });

    it('should scale the point by a given factor', () => {
        const point = new Point(2, 3);
        point.scale(2);
        expect(point.x).toBe(4);
        expect(point.y).toBe(6);
    });
});

describe('getLength function', () => {
    it('should return the length of a Lengthy object', () => {
        const obj: Lengthy = { length: 5 };
        expect(getLength(obj)).toBe(5);
    });
});
