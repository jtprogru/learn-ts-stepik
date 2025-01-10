export type Mode = 'r' | 'w' | 'rb' | 'wb' | 'a';
export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function workWithFile(fileName: string, mode: Mode): void {
    switch (mode) {
        case 'r':
            console.log(`Reading from file: ${fileName}`);
            break;
        case 'w':
            console.log(`Writing to file: ${fileName}`);
            break;
        case 'rb':
            console.log(`Reading binary from file: ${fileName}`);
            break;
        case 'wb':
            console.log(`Writing binary to file: ${fileName}`);
            break;
        case 'a':
            console.log(`Appending to file: ${fileName}`);
            break;
        default:
            throw new Error(`Unsupported mode: ${mode}`);
    }
}
