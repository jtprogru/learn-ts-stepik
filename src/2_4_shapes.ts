export abstract class Shape {
    abstract readonly kind: string;

    abstract area(): number;
}

export class Circle extends Shape {
    readonly kind = 'circle';

    constructor(private readonly radius: number) {
        super();
    }

    area(): number {
        return Math.round(Math.PI * this.radius ** 2);
    }
}

export class Rectangle extends Shape {
    readonly kind = 'rectangle';

    constructor(
        private readonly width: number,
        private readonly height: number,
    ) {
        super();
    }

    area(): number {
        return Math.round(this.width * this.height);
    }
}

export function parseShape(line: string): Shape {
    const [kind, ...args] = line.trim().split(/\s+/);
    const nums = args.map(Number);

    switch (kind) {
        case 'circle':
            return new Circle(nums[0]);
        case 'rectangle':
            return new Rectangle(nums[0], nums[1]);
        default:
            throw new Error(`Unsupported shape: ${kind}`);
    }
}

export function solve(input: string): string[] {
    return input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map(parseShape)
        .map((shape) => `${shape.kind} ${shape.area()}`);
}

if (require.main === module) {
    const input = require('fs').readFileSync(0, 'utf-8') as string;
    for (const line of solve(input)) {
        console.log(line);
    }
}
