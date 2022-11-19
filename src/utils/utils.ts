import { useState } from "react";

export function useForceUpdate() {
    const [value, setValue] = useState(0);

    return () => setValue(value => value + 1);
}

export const startDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}