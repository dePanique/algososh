interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getElements: () => T[];
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.getSize() !== 0) {
            this.container.pop();
        };
    };

    peak = (): T  => {
        const { length } = this.container;
        return this.container[length - 1];
    };

    getSize = () => this.container.length;

    getElements = () => this.container;
    
    clear = () => this.container = [];
}