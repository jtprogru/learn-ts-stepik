import { Base } from './2_3_abstracts';

class Derived extends Base {
    getName(): string {
        return 'Derived';
    }
}

describe('Base class', () => {
    it('should call getName and print the name', () => {
        const derived = new Derived();
        const consoleSpy = jest.spyOn(console, 'log');
        derived.printName();
        expect(consoleSpy).toHaveBeenCalledWith('Name:', 'Derived');
        consoleSpy.mockRestore();
    });
});
