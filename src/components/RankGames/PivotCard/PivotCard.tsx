import React, { FC } from 'react';
import { truncate } from '../../../utils/utility-functions';
import styles from './PivotCard.module.scss';
import { PivotCardProps } from './PivotCard.props';

const PivotCard: FC<PivotCardProps> = ({ game: { name, image, year_published } }) => {
  return <div className={styles.pivotCardContainer} title={name}>
    <div className={styles.imageContainer}>
      <div className={styles.imageBackground}>
        <img src={image} alt={name} />
      </div>
    </div>
    <div className={styles.gameStats}>
      <h2 className={styles.gameName}>{truncate(name, 25)}</h2>
      <div className={styles.gameYear}>{year_published}</div>
    </div>
  </div>;
}

export default PivotCard;
