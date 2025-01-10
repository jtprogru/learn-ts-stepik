export abstract class Base {
    abstract getName(): string;

    printName() {
        console.log('Name:', this.getName());
    }
}
