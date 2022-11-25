import { MouseEventHandler } from "react";
import { IconNames } from "./icons/icon-data";

interface IconProps {
    name: IconNames;
    className: string;
    onClick?: MouseEventHandler;
}

export type { IconProps };
