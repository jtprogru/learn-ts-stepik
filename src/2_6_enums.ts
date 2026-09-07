import { readFileSync } from 'fs';

export enum Season {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    AUTUMN = 'AUTUMN',
    WINTER = 'WINTER',
}

export enum Hemisphere {
    NORTHERN = 'NORTHERN',
    SOUTHERN = 'SOUTHERN',
}

const NORTHERN_SEASONS: Season[] = [
    Season.WINTER, // 1
    Season.WINTER, // 2
    Season.SPRING, // 3
    Season.SPRING, // 4
    Season.SPRING, // 5
    Season.SUMMER, // 6
    Season.SUMMER, // 7
    Season.SUMMER, // 8
    Season.AUTUMN, // 9
    Season.AUTUMN, // 10
    Season.AUTUMN, // 11
    Season.WINTER, // 12
];

const OPPOSITE_SEASON: Record<Season, Season> = {
    [Season.SPRING]: Season.AUTUMN,
    [Season.SUMMER]: Season.WINTER,
    [Season.AUTUMN]: Season.SPRING,
    [Season.WINTER]: Season.SUMMER,
};

export function getSeason(month: number, hemisphere: Hemisphere): Season {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new Error(`Invalid month: ${month}`);
    }

    const season = NORTHERN_SEASONS[month - 1];

    switch (hemisphere) {
        case Hemisphere.NORTHERN:
            return season;
        case Hemisphere.SOUTHERN:
            return OPPOSITE_SEASON[season];
        default:
            throw new Error(`Unsupported hemisphere: ${hemisphere}`);
    }
}

/** Разбирает строку вида `NORTHERN 1` — полушарие, затем месяц — и возвращает сезон. */
export function solve(line: string): Season {
    const [hemisphere, month] = line.trim().toUpperCase().split(/\s+/);
    return getSeason(Number(month), hemisphere as Hemisphere);
}

// Прямой запуск (так задачу гоняет Stepik): читаем stdin, печатаем сезон на строку.
if (require.main === module) {
    readFileSync(0, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .forEach((line) => console.log(solve(line)));
}
