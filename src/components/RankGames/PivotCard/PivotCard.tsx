import React, { FC } from 'react';
import styles from './PivotCard.module.scss';
import { PivotCardProps } from './PivotCard.props';

const PivotCard: FC<PivotCardProps> = ({ game: { name, image, year_published } }) => {
  return <div className={styles.pivotCardContainer}>
    <div className={styles.imageContainer}>
      <div className={styles.imageBackground}>
        <img src={image} alt={name} />
      </div>
    </div>
  </div>;
}

export default PivotCard;
