import React, { FC } from 'react';
import { Game } from '../../../interfaces/BggTypes';
import Icon from '../../Icon/Icon';
import styles from './RankedGamesList.module.scss';
import { RankedGamesListProps } from './RankedGamesList.props';
import RankedGamesListItem from './RankedGamesListItem/RankedGamesListItem';

const RankedGamesList: FC<RankedGamesListProps> = ({ games, resetFn }) => {
  const gameItems: Array<Game> = games.map(g => g.pivot).reverse();

  const downloadGameList = () => {
    const gameList = gameItems.map(g => g.name).join('\n');
    navigator.clipboard.writeText(gameList);
  }

  return <div className={styles.gameListContainer}>
    <div className={styles.buttonContainer}>
      <button onClick={downloadGameList} className={styles.exportButton}>
        copy rankings to clipboard
        <Icon className={styles.exportIcon} name='rankingStar' />
      </button>
      <button onClick={resetFn} className={styles.resetButton}>
        RESET RATINGS
        <Icon className={styles.warningIcon} name='triangleExclamation' />
      </button>
    </div>
    <div className={styles.gameItemsContainer}>
      {gameItems.map((g, i) => <RankedGamesListItem key={g.name} game={g} rank={i + 1} />)}
    </div>
  </div>;
};

export default RankedGamesList;
