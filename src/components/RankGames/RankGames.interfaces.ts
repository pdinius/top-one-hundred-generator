import { Game } from "../../interfaces/BggTypes";

interface Columns {
    "lesser-games": Array<Game>;
    "greater-games": Array<Game>;
}

interface SortGroup {
    pivot: Game;
    gamesToCompare: Array<Game>;
    lesser: Array<Game>;
    greater: Array<Game>;
    currentSortees: Array<Game>;
}

export type {
    Columns,
    SortGroup
}
