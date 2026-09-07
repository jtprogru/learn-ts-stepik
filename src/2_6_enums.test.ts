import { getSeason, Hemisphere, Season, solve } from './2_6_enums';

describe('getSeason function', () => {
    const northernByMonth: [number, Season][] = [
        [1, Season.WINTER],
        [2, Season.WINTER],
        [3, Season.SPRING],
        [4, Season.SPRING],
        [5, Season.SPRING],
        [6, Season.SUMMER],
        [7, Season.SUMMER],
        [8, Season.SUMMER],
        [9, Season.AUTUMN],
        [10, Season.AUTUMN],
        [11, Season.AUTUMN],
        [12, Season.WINTER],
    ];

    it.each(northernByMonth)('should return the season of month %i in the northern hemisphere', (month, expected) => {
        expect(getSeason(month, Hemisphere.NORTHERN)).toBe(expected);
    });

    const southernByMonth: [number, Season][] = [
        [1, Season.SUMMER],
        [2, Season.SUMMER],
        [3, Season.AUTUMN],
        [4, Season.AUTUMN],
        [5, Season.AUTUMN],
        [6, Season.WINTER],
        [7, Season.WINTER],
        [8, Season.WINTER],
        [9, Season.SPRING],
        [10, Season.SPRING],
        [11, Season.SPRING],
        [12, Season.SUMMER],
    ];

    it.each(southernByMonth)('should return the season of month %i in the southern hemisphere', (month, expected) => {
        expect(getSeason(month, Hemisphere.SOUTHERN)).toBe(expected);
    });

    it('should return opposite seasons for the same month', () => {
        for (let month = 1; month <= 12; month++) {
            expect(getSeason(month, Hemisphere.SOUTHERN)).not.toBe(getSeason(month, Hemisphere.NORTHERN));
        }
    });

    it.each([0, 13, -1, 1.5, NaN])('should throw an error for invalid month %p', (month) => {
        expect(() => getSeason(month, Hemisphere.NORTHERN)).toThrow(`Invalid month: ${month}`);
    });

    it('should throw an error for unsupported hemisphere', () => {
        expect(() => getSeason(1, 'EASTERN' as Hemisphere)).toThrow('Unsupported hemisphere: EASTERN');
    });
});

describe('solve function', () => {
    it.each([
        ['NORTHERN 1', Season.WINTER],
        ['NORTHERN 4', Season.SPRING],
        ['SOUTHERN 1', Season.SUMMER],
        ['SOUTHERN 9', Season.SPRING],
    ])('should parse %p as %s', (line, expected) => {
        expect(solve(line)).toBe(expected);
    });

    it('should tolerate extra whitespace and lower case', () => {
        expect(solve('  northern   12  ')).toBe(Season.WINTER);
    });
});
