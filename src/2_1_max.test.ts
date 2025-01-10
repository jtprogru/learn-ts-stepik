import { max } from './2_1_max';

describe('max function', () => {
    it('should return the maximum of two numbers', () => {
        expect(max(1, 2)).toBe(2);
        expect(max(5, 3)).toBe(5);
        expect(max(-1, -5)).toBe(-1);
        expect(max(-1, 0)).toBe(0);
    });

    it('should return the number itself when both numbers are equal', () => {
        expect(max(4, 4)).toBe(4);
        expect(max(-3, -3)).toBe(-3);
    });
});

describe('fail test', () => {
    it('should fail when one of the arguments is not a number', () => {
        expect(() => max(1, '2' as any)).toThrow();
        expect(() => max('1' as any, 2)).toThrow();
    });
});
