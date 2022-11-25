import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection } from '../../adapters/BggApiAdapter';
import { Game } from '../../interfaces/BggTypes';
import GameCard from '../GameCard/GameCard';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import styles from './ChooseGames.module.scss';
import { ChooseGamesProps } from './ChooseGames.props';
import ChooseGamesOptions from './ChooseGamesOptions/ChooseGamesOptions';
import ChooseGamesPagination from './ChooseGamesPagination/ChooseGamesPagination';

const PAGE_SIZE = 32;

const ChooseGames: FC<ChooseGamesProps> = ({ setTotalSelectedGames }) => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [gamesData, setGamesData] = useState<Array<Game>>([])
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState('rating');
  const [filter, setFilter] = useState('no filter')
  const [query, setQuery] = useState('');

  const username = useMemo(() => params.username, [params.username]);
  const page = useMemo(() => Number(params.page || 1), [params.page]);

  useEffect(() => {
    if (username === undefined) return;

    setLoading(true);
    const controller = new AbortController();
    collection(username, { abortSignal: controller.signal }).then((d) => {
      if (d === null) return;
      setGamesData(d);
      setTotalSelectedGames(d.filter(g => g.selected).length)
    }).catch(e => {
      setError(e.message);
    }).finally(() => {
      setLoading(false);
    })

    return () => {
      controller.abort();
    }
  }, [setTotalSelectedGames, username])


  const gamesSortFunc = useMemo(() => (a: Game, b: Game) => {
    switch (sort) {
      case 'rank': return a.stats.rank - b.stats.rank || a.name.localeCompare(b.name);
      case 'rating': return (b.stats.rating || 0) - (a.stats.rating || 0);
      case 'name': return a.name.localeCompare(b.name);
      case 'number of plays': return b.num_plays - a.num_plays;
      case 'selected': return (b.selected ? 1 : 0) - (a.selected ? 1 : 0) || a.name.localeCompare(b.name);
      case 'year published': return +b.year_published - +a.year_published;
      default: return 0;
    }
  }, [sort]);

  const gamesFilterFunc = useMemo(() => (a: Game) => {
    switch (filter) {
      case 'only played': return a.played;
      case 'only owned': return a.status?.own;
      default: return true;
    }
  }, [filter])

  const gamesQueryFunc = useMemo(() => (a: Game) => {
    if (!query.trim()) return true;
    return a.name.toLowerCase().includes(query.trim().toLowerCase());
  }, [query])

  const toggleSelected = (gameName: string) => {
    setGamesData((prev: Array<Game>) => {
      const newArr = prev.slice();
      let found = newArr.find(g => g.name === gameName);
      if (!found) {
        console.log(`couldn't find ${gameName}.`);
      } else {
        found.selected = !found.selected;
        let selectedGames = newArr.filter(g => g.selected);
        setTotalSelectedGames(selectedGames.length);
        if (username) localStorage.setItem(username, JSON.stringify(newArr));
      }
      return newArr;
    })
  }

  return (<div className={styles.chooseGameContainer}>{
    loading
      ? <LoadingAnimation />
      : error ||
      <>
        <ChooseGamesOptions setSort={setSort} setFilter={setFilter} setQuery={setQuery} />
        <div className={styles.gameCardsContainer}>{
          gamesData
            .sort(gamesSortFunc)
            .filter(gamesFilterFunc)
            .filter(gamesQueryFunc)
            .slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page)
            .map((g: Game, i: number) => {
              return (<div key={g.name} onClick={() => toggleSelected(g.name)} className={g.selected ? '' : styles.semiTransparent}>
                <GameCard game={g} />
              </div>);
            })
        }</div>
        <ChooseGamesPagination numPages={ Math.ceil(gamesData.filter(gamesFilterFunc).filter(gamesQueryFunc).length / PAGE_SIZE) } />
      </>
  }</div>);
};

export default ChooseGames;
