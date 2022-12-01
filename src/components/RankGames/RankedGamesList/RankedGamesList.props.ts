import { SortGroup } from "../RankGames.interfaces"

interface RankedGamesListProps {
    games: Array<SortGroup>;
    resetFn: () => void;
}

export type {
    RankedGamesListProps
}
