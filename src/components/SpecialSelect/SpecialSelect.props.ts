import { RefObject } from "react";

interface SpecialSelectProps {
    options: Array<string>;
    setter: (s: string) => void;
}

export type {
    SpecialSelectProps
}
