export function max(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Arguments must be numbers');
    }
    return a > b ? a : b;
}

