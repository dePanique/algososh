import { ElementStates } from "../../types/element-states";

export const hardDisabled = {
    addInHead: true,
    addInTail: true,
    deleteHead: true,
    deleteTail: true,
    addByIndex: true,
    deleteByIndex: true,
}

export const initialObj = {
    index: 0,
    state: ElementStates.Default,
    value: 0
};