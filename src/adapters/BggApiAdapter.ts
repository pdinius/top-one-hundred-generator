import { Game } from '../interfaces/BggTypes';
import bggApiToJson from 'bgg-api-to-json';

interface AdapterOptions {
    forceUpdate?: boolean;
    abortSignal?: AbortSignal;
}

export const collection = async (username: string, options: AdapterOptions = { forceUpdate: false }): Promise<Array<Game>> => {
    const {
        forceUpdate,
        abortSignal
    } = options;

    const cached = localStorage.getItem(username);

    if (!forceUpdate && cached) {
        console.log('Loading local storage version...');
        return JSON.parse(cached);
    }

    try {
        const currentGames = localStorage.getItem(username);
        let selectedItems: { [key: string]: boolean } = {};
        if (currentGames) JSON.parse(currentGames).forEach((g: Game) => selectedItems[g.name] = g.selected);
        let data = await bggApiToJson.collection({ username, stats: true, exclude_subtype: 'boardgameexpansion' }, abortSignal);
        let res = data.items.map(v => {
            const { status, stats } = v;

            const gameStatus = {
                own: status.own,
                prevowned: status.prev_own,
                fortrade: status.for_trade,
                want: status.want,
                wanttoplay: status.want_to_play,
                wanttobuy: status.want_to_buy,
                wishlist: status.wishlist,
                preordered: status.preordered,
                last_modified: new Date(status.last_modified)
            };

            const { rank } = stats!;

            const gameStats = {
                min_players: stats!.min_players,
                max_players: stats!.max_players,
                min_play_time: stats!.min_play_time,
                max_play_time: stats!.max_play_time,
                playing_time: stats!.playing_time,
                rating: v.rating!,
                rank: rank === -1 ? 99999 : rank,
            };

            const gameItem: Game = {
                name: v.name,
                year_published: v.year_published || '',
                image: v.image || '',
                thumbnail: v.thumbnail || '',
                num_plays: v.num_plays || 0,
                played: (v.num_plays && Number(v.num_plays) > 0) || false,
                selected: selectedItems[v.name] || false,
                status: gameStatus,
                stats: gameStats
            };

            return gameItem;
        }).filter((g1,i,a) => i === a.findIndex(g2 => g1.name === g2.name));

        localStorage.setItem(username, JSON.stringify(res));

        return res;
    } catch (e) {
        console.error(e);
        return [];
    }
}
