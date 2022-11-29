import React, { FC } from 'react';
import styles from './RankGamesProgress.module.scss';
import { RankGamesProgressProps } from './RankGamesProgress.props';
import RankGamesProgressSection from './RankGamesProgressSection/RankGamesProgressSection';

const RankGamesProgress: FC<RankGamesProgressProps> = ({ sortGroups, currentIndex }) => {
  return <div className={styles.progressContainer}>
    {sortGroups.map((g,i) => {
      return <>
        {g.lesser.length ? <RankGamesProgressSection key={`${i}-a`} width={2 * g.lesser.length} current={currentIndex === i ? 'side' : undefined} /> : <></>}
        <RankGamesProgressSection key={`${i}-b`} width={4 + 2 * (g.gamesToCompare.length + g.currentSortees.length)}  current={currentIndex === i ? 'main' : undefined} />
        {g.greater.length ? <RankGamesProgressSection key={`${i}-c`} width={2 * g.greater.length}  current={currentIndex === i ? 'side' : undefined} /> : <></>}
      </>;
    })}
  </div>;
}

export default RankGamesProgress;
