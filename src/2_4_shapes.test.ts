import { Circle, Rectangle, Shape, parseShape, solve } from './2_4_shapes';

describe('Shape', () => {
    it('should round the area of a circle', () => {
        expect(new Circle(5).area()).toBe(79);
        expect(new Circle(3).area()).toBe(28);
    });

    it('should compute the area of a rectangle', () => {
        expect(new Rectangle(4, 6).area()).toBe(24);
    });

    it('should work through the base class', () => {
        const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6), new Circle(3)];
        expect(shapes.map((s) => s.area())).toEqual([79, 24, 28]);
    });
});

describe('parseShape', () => {
    it('should build a shape from a line', () => {
        expect(parseShape('circle 5')).toBeInstanceOf(Circle);
        expect(parseShape('rectangle 4 6')).toBeInstanceOf(Rectangle);
    });

    it('should throw on an unknown shape', () => {
        expect(() => parseShape('triangle 3 4 5')).toThrow('Unsupported shape: triangle');
    });
});

describe('solve', () => {
    it('should match the sample test data', () => {
        expect(solve('circle 5\nrectangle 4 6\ncircle 3\n')).toEqual([
            'circle 79',
            'rectangle 24',
            'circle 28',
        ]);
    });
});
