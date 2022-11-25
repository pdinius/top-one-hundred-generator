type Cache = {
    [key: string]: Array<any>;
}

type Status = {
    own: boolean;
    prevowned: boolean;
    fortrade: boolean;
    want: boolean;
    wanttoplay: boolean;
    wanttobuy: boolean;
    wishlist: boolean;
    preordered: boolean;
    last_modified: Date;
}

type Stats = {
    min_players: number;
    max_players: number;
    min_play_time: number;
    max_play_time: number;
    playing_time: number;
    rating: number;
    rank: number;
}

type Game = {
    name: string;
    year_published: string;
    image: string;
    thumbnail: string;
    num_plays: number;
    played: boolean;
    selected: boolean;
    status: Status;
    stats: Stats;
}

export type {
    Cache, Status, Stats, Game
}
