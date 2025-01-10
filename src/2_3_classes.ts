export class Point {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    scale(factor: number) {
        this.x *= factor;
        this.y *= factor;
    }
}

export type Lengthy = { length: number };

export interface IPoint {
    readonly x: number;
    readonly y: number;
}

export function getLength(x: Lengthy): number {
    return x.length;
}

export type Person = {
    name: string;
    age: number;
};

// объект имеет свойство length - значит он соответсвует типу Lengthy
console.log(getLength({length: 10}));

// все массивы имеют поле length - соответсвует типу Lengthy
console.log(getLength([1,2,3]))

// имеет поле length и дополнительное поле height
// дополнительное поле не мешает ему соответсвовать типу Lengthy
const y = {length: 10, height: 2};
console.log(getLength(y));
