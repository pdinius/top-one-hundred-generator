import { IconNames } from "../Icon/icons/icon-data"

interface InputWithIconProps {
    icon: IconNames;
    refObj: React.RefObject<HTMLInputElement>;
    submitFn: (e: React.FormEvent) => void;
    outline?: boolean;
    clearButton?: boolean;
    clearSideEffect?: Function;
}

export type {
    InputWithIconProps
}
