import { ElementStates } from "../../types/element-states";

export class Node<T> {
    value: T
    next: Node<T> | null
    index: number
    state: ElementStates

    constructor(value: T, index: number, state: ElementStates, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
        this.index = index;
        this.state = state;
    }
}

interface ILinkedList<T> {
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    head: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAt(element: T, index: number, state = ElementStates.Default) {
        console.log('insert');

        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element, index, state = ElementStates.Default);

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;

                while (currIndex < index) {
                    currIndex++;
                    if (curr?.next && currIndex !== index) {
                        curr = curr?.next;
                    }
                }
                if (curr) {
                    node.next = curr.next;
                    curr.next = node;
                }
            }
            this.size++;
        }
    }

    deleteAt(index: number) {
        console.log('delete');
        
        if (index >= 0 && index < this.size && this.head) {
            let curr = this.head;
            let prev = curr;
            let currIndex = 0;
            if (index === 0) {
                this.head = curr.next;
            } else {
                while (currIndex < index) {
                    currIndex++;
                    if (curr.next) {
                        prev = curr;
                        curr = curr.next;
                    }
                }
                prev.next = curr.next;
            }
            this.size--;
        }
    }

    append(value: T, state: ElementStates = ElementStates.Changing) {
        const node = new Node(value, this.getSize(), state);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    prepend(value: T, state: ElementStates = ElementStates.Changing) {
        const node = new Node(value, 0, state = ElementStates.Changing)
        node.next = this.head;
        this.head = node
    }

    getSize() {
        return this.size;
    }

    getArray = () => {
        const nodes = [];
        let currentNode = this.head;

        while (currentNode) {
            nodes.push({
                value: currentNode.value,
                index: currentNode.index,
                state: currentNode.state
            });
            currentNode = currentNode.next;
        }

        return nodes;
    }

    changeElementColor = (state: ElementStates, index: number) => {

        let current;
        let ind = 0;

        if (this.head === null) {

        } else {
            current = this.head;
            while (current.next && ind < index) {
                ind++
                current = current.next;
            }
            current.state = state;
        }
        this.size++;
    }

    deleteHead = () => {
        let next;
        if (this.head !== null) {
            next = this.head.next;
            this.head = next;
        }
    }

    deleteTail = () => {

        if (!this.head?.next) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }
}