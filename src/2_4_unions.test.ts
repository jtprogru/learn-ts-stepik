import { workWithFile, Mode } from './2_4_unions';

describe('workWithFile function', () => {
    const fileName = 'example.txt';

    it('should log reading from file', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        workWithFile(fileName, 'r');
        expect(consoleSpy).toHaveBeenCalledWith(`Reading from file: ${fileName}`);
        consoleSpy.mockRestore();
    });

    it('should log writing to file', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        workWithFile(fileName, 'w');
        expect(consoleSpy).toHaveBeenCalledWith(`Writing to file: ${fileName}`);
        consoleSpy.mockRestore();
    });

    it('should log reading binary from file', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        workWithFile(fileName, 'rb');
        expect(consoleSpy).toHaveBeenCalledWith(`Reading binary from file: ${fileName}`);
        consoleSpy.mockRestore();
    });

    it('should log writing binary to file', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        workWithFile(fileName, 'wb');
        expect(consoleSpy).toHaveBeenCalledWith(`Writing binary to file: ${fileName}`);
        consoleSpy.mockRestore();
    });

    it('should log appending to file', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        workWithFile(fileName, 'a');
        expect(consoleSpy).toHaveBeenCalledWith(`Appending to file: ${fileName}`);
        consoleSpy.mockRestore();
    });

    it('should throw an error for unsupported mode', () => {
        expect(() => workWithFile(fileName, 'unsupported' as Mode)).toThrowError('Unsupported mode: unsupported');
    });
});
