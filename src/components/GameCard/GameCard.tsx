import React, { FC } from 'react';
import { truncate } from '../../utils/utility-functions';
import styles from './GameCard.module.scss';
import { GameCardProps } from './GameCard.props';

const GameCard: FC<GameCardProps> = ({ game: { name, selected, thumbnail, stats: { rank } } }) => {
  return (<div className={styles.gameCardContainer}>
    <div className={styles.thumbnailContainer}>
      <img src={thumbnail} alt={name}></img>
    </div>
    <div className={`${styles.gameCard} ${selected ? styles.selected : ''}`}>
      <span className={styles.titleText}>{truncate(name)}</span>
    </div>
  </div>);
};

export default GameCard;
