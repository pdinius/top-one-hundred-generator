import React, { FC } from 'react';
import Icon from '../../Icon/Icon';
import styles from './RankGamesProgress.module.scss';
import { RankGamesProgressProps } from './RankGamesProgress.props';
import RankGamesProgressSection from './RankGamesProgressSection/RankGamesProgressSection';

const RankGamesProgress: FC<RankGamesProgressProps> = ({ sortGroups, currentIndex }) => {
  return <div className={styles.progressContainer}>
    <Icon className={styles.rankGamesIcon} name='poop' />
    <Icon className={`${styles.rankGamesIcon} ${styles.colonIcon}`} name='colon' />
    {sortGroups.map((g,i) => {
      let middleWidth = g.gamesToCompare.length + g.currentSortees.length + 1
      return <>
        {g.lesser.length
          ? <RankGamesProgressSection
              key={`${i}-a`}
              width={2 * g.lesser.length}
              title={`${g.lesser.length} Games`}
              current={currentIndex === i ? 'side' : undefined}
              content={g.lesser.length > 4 ? String(g.lesser.length) : ''} />
          : <></>}
        <RankGamesProgressSection
          key={`${i}-b`}
          width={1 + 2 * middleWidth}
          title={middleWidth > 1 ? `${middleWidth} Games` : g.pivot.name}
          current={currentIndex === i ? 'main' : undefined}
          content={middleWidth > 4 ? String(middleWidth) : ''} />
        {g.greater.length
          ? <RankGamesProgressSection
              key={`${i}-c`}
              width={2 * g.greater.length} 
              title={`${g.greater.length} Games`}
              current={currentIndex === i ? 'side' : undefined}
              content={g.greater.length > 4 ? String(g.greater.length) : ''} />
          : <></>}
      </>;
    })}
    <Icon className={`${styles.rankGamesIcon} ${styles.colonIcon}`} name='colon' />
    <Icon className={styles.rankGamesIcon} name='award' />
  </div>;
}

export default RankGamesProgress;
