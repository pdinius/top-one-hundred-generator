import React, { FC } from 'react';
import styles from './RankGamesProgressSection.module.scss';
import { RankGamesProgressSectionProps } from './RankGamesProgressSection.props';

const RankGamesProgressSection: FC<RankGamesProgressSectionProps> = ({ width, current }) => {
  let classes = [styles.progressSection];
  switch (current) {
    case 'main':
      classes.push(styles.mainSection);
      break;
    case 'side':
      classes.push(styles.sideSection);
  }
  return <div style={{ width: `${width}px` }} className={classes.join(' ')}></div>
};

export default RankGamesProgressSection;