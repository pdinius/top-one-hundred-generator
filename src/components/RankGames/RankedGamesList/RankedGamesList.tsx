import React, { FC } from 'react';
import { Game } from '../../../interfaces/BggTypes';
import Icon from '../../Icon/Icon';
import styles from './RankedGamesList.module.scss';
import { RankedGamesListProps } from './RankedGamesList.props';
import RankedGamesListItem from './RankedGamesListItem/RankedGamesListItem';

const RankedGamesList: FC<RankedGamesListProps> = ({ games }) => {
  const gameItems: Array<Game> = games.map(g => g.pivot).reverse();

  const downloadGameList = () => {
    const gameList = gameItems.map(g => g.name).join('\n');
    navigator.clipboard.writeText(gameList);
  }

  return <div className={styles.gameListContainer}>
    <button onClick={downloadGameList} className={styles.exportButton}><Icon className={styles.exportIcon} name='rankingStar' />copy rankings to clipboard<Icon className={styles.exportIcon} name='rankingStar' /></button>
    {gameItems.map((g,i) => <RankedGamesListItem key={g.name} game={g} rank={i+1} />)}
  </div>;
};

export default RankedGamesList;
