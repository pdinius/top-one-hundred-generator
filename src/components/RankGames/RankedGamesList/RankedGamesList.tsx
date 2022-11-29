import React, { FC } from 'react';
import { Game } from '../../../interfaces/BggTypes';
import styles from './RankedGamesList.module.scss';
import { RankedGamesListProps } from './RankedGamesList.props';

const RankedGamesList: FC<RankedGamesListProps> = ({ games }) => {
  const gameItems: Array<Game> = games.map(g => g.pivot);

  return <div className={styles.gameListContainer}>
    {gameItems.map(g => <span key={g.name}>{g.name}</span>)}
  </div>;
};

export default RankedGamesList;
