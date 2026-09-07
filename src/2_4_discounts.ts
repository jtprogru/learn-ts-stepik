export abstract class Discount {
    abstract readonly kind: string;

    abstract apply(price: number): number;
}

export class PercentDiscount extends Discount {
    readonly kind = 'percent';

    constructor(private readonly percent: number) {
        super();
    }

    apply(price: number): number {
        return Math.max(0, Math.round(price * (1 - this.percent / 100)));
    }
}

export class FixedDiscount extends Discount {
    readonly kind = 'fixed';

    constructor(private readonly amount: number) {
        super();
    }

    apply(price: number): number {
        return Math.max(0, Math.round(price - this.amount));
    }
}

export function parseDiscount(line: string): Discount {
    const [kind, ...args] = line.trim().split(/\s+/);
    const nums = args.map(Number);

    switch (kind) {
        case 'percent':
            return new PercentDiscount(nums[0]);
        case 'fixed':
            return new FixedDiscount(nums[0]);
        default:
            throw new Error(`Unsupported discount: ${kind}`);
    }
}

export function solve(input: string): number {
    const [priceLine, ...rest] = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    return rest
        .map(parseDiscount)
        .reduce((price, discount) => Math.max(0, discount.apply(price)), Number(priceLine));
}

if (require.main === module) {
    const input = require('fs').readFileSync(0, 'utf-8') as string;
    console.log(solve(input));
}
