export class IDGenerator {
    private static instance: IDGenerator;
    private counter: number = 0;

    private constructor() {}

    public static getInstance(): IDGenerator {
        if (!IDGenerator.instance) {
            IDGenerator.instance = new IDGenerator();
        }
        return IDGenerator.instance;
    }

    public getNextId(): number {
        return ++this.counter;
    }

    public setId(id: number): void {
        if (id > this.counter) {
            this.counter = id;
        }
    }
}