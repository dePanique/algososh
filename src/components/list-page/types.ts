import { ElementStates } from "../../types/element-states";

export interface IObject {
    index: number
    state: ElementStates
    value: number
}

export type TActivness = {
    status: boolean,
    value: number,
    index?: number
}

export interface IHashTable<T> {
    [name: string]: {
        'topRow': {
            element: ''
        },
        'middleRow': {
            value: T,
            index: number,
            state: ElementStates
        },
        'bottomRow': {
            element: ''
        }
    } 
}