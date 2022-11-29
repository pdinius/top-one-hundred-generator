import React, { FC } from 'react';
import { Game } from '../../../interfaces/BggTypes';
import styles from './RankedGamesList.module.scss';
import { RankedGamesListProps } from './RankedGamesList.props';
import RankedGamesListItem from './RankedGamesListItem/RankedGamesListItem';

const RankedGamesList: FC<RankedGamesListProps> = ({ games }) => {
  const gameItems: Array<Game> = games.map(g => g.pivot);

  return <div className={styles.gameListContainer}>
    {gameItems.map((g,i) => <RankedGamesListItem key={g.name} game={g} rank={i+1} />)}
  </div>;
};

export default RankedGamesList;
