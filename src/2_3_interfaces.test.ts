import { CustomWindow, Sonar } from './2_3_interfaces';

describe('Window interface', () => {
    it('should conform to the Window interface', () => {
        const windowObj: CustomWindow = {
            title: 'My Window',
            ts: {
                version: '4.0',
                compile: (code: string) => `Compiled: ${code}`
            }
        };

        expect(windowObj.title).toBe('My Window');
        expect(windowObj.ts.version).toBe('4.0');
        expect(windowObj.ts.compile('test')).toBe('Compiled: test');
    });
});

describe('Sonar class', () => {
    it('should implement Pingable interface and have a ping method', () => {
        const sonar = new Sonar();
        const consoleSpy = jest.spyOn(console, 'log');
        sonar.ping();
        expect(consoleSpy).toHaveBeenCalledWith('ping!');
        consoleSpy.mockRestore();
    });
});
