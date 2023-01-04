import { JSXElementConstructor, ReactElement } from "react";
import { ElementStates } from "../../types/element-states";
import { IHashTable } from "./types";
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
    table: IHashTable<T> = {}

    constructor() {
        this.head = null;
        this.size = 0;
        this.table = {};
    }

    insertAt(element: T, index: number, state: ElementStates = ElementStates.Default) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element, index, state);

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
        const node = new Node(value, 0, state)
        node.next = this.head
        this.head = node
        this.size++
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
        
        this.createTable();
    }

    deleteHead = () => {
        let next
        if (this.head !== null) {
            next = this.head.next
            this.head = next
            this.size--
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

    createTable = () => {
        const array = this.getArray()
        const { length } = array
        for (let num in array) {
            if (this.table.num) {
                this.table.num.middleRow = {
                    ...array[num]
                }
            } else {
                this.table = {
                    ...this.table,
                    [`${num}`] : {
                        'topRow': {
                            element: num === '0' ? 'head' : ''
                        },
                        'middleRow' : {
                            ...array[num]
                        },
                        'bottomRow': {
                            element: +num === (length - 1) ? 'tail' : ''
                        }
                    }
                }
            }
        }  
    }

    addInHeadRow = (index: number, value: string | ReactElement<any, string | JSXElementConstructor<any>>) => {
        this.table[`${index}`].topRow.element = value 
    }

    addInTailRow = (index: number, value: string | ReactElement<any, string | JSXElementConstructor<any>>) => {
        this.table[`${index}`].bottomRow.element = value 
    }

    getTable = () => {
        return (this.table)
    }
}