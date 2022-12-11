import { ElementStates } from "../../types/element-states";

export const getArray = () => {
    const allocate = Math.floor(3 + Math.random() * (15));

    const result = [];

    for (let i = 0; i < allocate; i++) {
        result.push(
            {
                item: Math.floor(Math.random() * 100),
                state: ElementStates.Default
            }
        );
    };

    return result;
};

export function swap<T>(arr: T[], i: number, j: number) {
    const tmp = arr[i];

    arr[i] = arr[j];
    arr[j] = tmp;
};