import { Discount, FixedDiscount, PercentDiscount, parseDiscount, solve } from './2_4_discounts';

describe('Discount', () => {
    it('should subtract a percent and round the result', () => {
        expect(new PercentDiscount(10).apply(100)).toBe(90);
        expect(new PercentDiscount(15).apply(99)).toBe(84);
    });

    it('should subtract a fixed amount', () => {
        expect(new FixedDiscount(100).apply(500)).toBe(400);
    });

    it('should never go below zero', () => {
        expect(new FixedDiscount(100).apply(50)).toBe(0);
        expect(new PercentDiscount(150).apply(50)).toBe(0);
    });

    it('should work through the base class', () => {
        const discounts: Discount[] = [new PercentDiscount(50), new FixedDiscount(20)];
        expect(discounts.map((d) => d.apply(200))).toEqual([100, 180]);
    });
});

describe('parseDiscount', () => {
    it('should build a discount from a line', () => {
        expect(parseDiscount('percent 10')).toBeInstanceOf(PercentDiscount);
        expect(parseDiscount('fixed 20')).toBeInstanceOf(FixedDiscount);
    });

    it('should throw on an unknown discount', () => {
        expect(() => parseDiscount('coupon 10')).toThrow('Unsupported discount: coupon');
    });
});

describe('solve', () => {
    it('should match the sample test data', () => {
        expect(solve('100\npercent 10\nfixed 20\n')).toBe(70);
        expect(solve('500\nfixed 100\npercent 50\n')).toBe(200);
        expect(solve('100\npercent 10\n')).toBe(90);
        expect(solve('500\nfixed 100\n')).toBe(400);
        expect(solve('200\npercent 10\nfixed 20\n')).toBe(160);
        expect(solve('50\nfixed 100\n')).toBe(0);
        expect(solve('400\npercent 50\npercent 50\n')).toBe(100);
    });

    it('should return the price when there are no discounts', () => {
        expect(solve('100\n')).toBe(100);
    });
});
