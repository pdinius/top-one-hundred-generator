import React, { FC } from 'react';
import styles from './RankGamesProgressSection.module.scss';
import { RankGamesProgressSectionProps } from './RankGamesProgressSection.props';

const RankGamesProgressSection: FC<RankGamesProgressSectionProps> = ({ width, current, title }) => {
  let classes = [styles.progressSection];
  switch (current) {
    case 'main':
      classes.push(styles.mainSection);
      break;
    case 'side':
      classes.push(styles.sideSection);
  }

  const content = current === 'main' ? (width - 4) / 2 + 1 : width / 2;

  return <div style={{ width: `${width}px` }} className={classes.join(' ')} title={title}>{width >= 10 ? content : ''}</div>
};

export default RankGamesProgressSection;
