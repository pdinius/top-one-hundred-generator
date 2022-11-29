import React, { FC } from 'react';
import { truncate } from '../../../../utils/utility-functions';
import styles_sort_card from '../../SortCard/SortCard.module.scss';
import styles from './RankedGamesListItem.module.scss';
import { RankedGamesListItemProps } from './RankedGamesListItem.props';

const RankedGamesListItem: FC<RankedGamesListItemProps> = ({ game: { name, thumbnail, year_published }, rank }) => {
  return <div className={styles.rankedGamesListItemContainer}>
    <div className={styles.rankContainer}>
      <div className={styles.rank}>{rank}</div>
    </div>
    <div
      className={styles_sort_card.sortCardContainer}
      title={name}>
      <div className={styles_sort_card.thumbnailContainer}>
        <img src={thumbnail} alt={name} />
      </div>
      <div className={styles_sort_card.sortCardRightSide}>
        <span className={styles_sort_card.title}>{truncate(name, 25)}</span>
        <span className={styles_sort_card.year}>{year_published}</span>
      </div>
    </div>
  </div>
}

export default RankedGamesListItem;
