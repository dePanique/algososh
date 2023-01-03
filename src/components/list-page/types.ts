import React, { JSXElementConstructor, ReactElement } from "react";
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

export interface CircleProps {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
}

export interface IHashTable<T> {
    [name: string]: {
        'topRow': {
            element: string | ReactElement<any, string | JSXElementConstructor<any>>
        },
        'middleRow': {
            value: T,
            index: number,
            state: ElementStates
        },
        'bottomRow': {
            element: string | ReactElement<any, string | JSXElementConstructor<any>>
        }
    } 
}