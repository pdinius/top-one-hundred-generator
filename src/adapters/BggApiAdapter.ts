import axios from 'axios';
import dayjs from 'dayjs';
import convert from 'xml-js';
import { timeout } from '../utils';
import { Cache, Status, Game } from '../interfaces/BggTypes';

const cache: Cache = {};

export const collection = (username: string, onlyOwned: boolean = false, includeStats: boolean = true): Promise<Array<any>> => {
    return new Promise(async (res, rej) => {
        // if (username in cache) res(cache[username]);
        try {
            let uri = `https://api.geekdo.com/xmlapi2/collection?username=${username}`;
            if (onlyOwned) uri += '&excludesubtype=boardgameexpansion';
            if (includeStats) uri += '&stats=1';
            let response = await axios.get(uri);

            while (response.status === 202) {
                await timeout(5000);
                response = await axios.get(uri);
            }

            if (response.status !== 200) {
                throw Error(`Failed with a status code of ${response.status}.`)
            }

            let jsonData = JSON.parse(convert.xml2json(response.data, { compact: true }));

            cache[username] = jsonData.items.item.map((g: any) => {
                try {
                    let res: Game = {
                        name: g.name?._text,
                        year_published: g.yearpublished?._text,
                        image: g.image?._text,
                        thumbnail: g.thumbnail?._text,
                        num_plays: +g.numplays._text
                    }

                    // status
                    let status = {} as { [key: string]: any };
                    for (let entry of Object.entries(g.status._attributes)) {
                        let [key, val] = entry as [string, string];
                        if (val === '0' || val === '1') {
                            status[key] = val === '1' ? true : false;
                        } else if (dayjs(key).isValid()) {
                            status.last_modified = dayjs(key);
                        } else {
                            status[key] = val;
                        }
                    }
                    res.status = status as Status;

                    // stats
                    if ('stats' in g) {
                        res.stats = {
                            min_players: g.stats._attributes.minplayers,
                            max_players: g.stats._attributes.maxplayers,
                            min_play_time: g.stats._attributes.minplaytime,
                            max_play_time: g.stats._attributes.maxplaytime,
                            playing_time: g.stats._attributes.playingtime,
                            rank: g.stats.rating.ranks.rank.find((r: any) => r._attributes.name === 'boardgame').value,
                            rating: g.stats.rating.average.value
                        };
                    }

                    return res
                } catch (e) {
                    return g.name;
                }
            });

            res(cache[username]);
        } catch (e) {
            rej(e);
        }
    })
}
