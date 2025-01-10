export interface CustomWindow {
    title: string
}

export interface TypeScriptAPI {
    version: string;
    compile(code: string): string;
}

// ок - добавили интерфейсу полей
export interface CustomWindow {
    ts: TypeScriptAPI
}

export interface Pingable {
    ping(): void;
}

export class Sonar implements Pingable {
    // компилятор проверит что, есть метод ping()
    // с нужной сигнатурой
    ping() {
        console.log("ping!");
    }
}
