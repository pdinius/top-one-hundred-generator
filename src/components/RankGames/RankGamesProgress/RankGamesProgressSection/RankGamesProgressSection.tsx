import React, { FC } from 'react';
import styles from './RankGamesProgressSection.module.scss';
import { RankGamesProgressSectionProps } from './RankGamesProgressSection.props';

const RankGamesProgressSection: FC<RankGamesProgressSectionProps> = ({ width, current, title }) => {
  const content = current === 'main' ? (width - 4) / 2 + 1 : width / 2;

  let classes = [styles.progressSection];
  switch (current) {
    case 'main':
      classes.push(styles.mainSection);
      break;
    case 'side':
      classes.push(styles.sideSection);
  }
  if (!/^\d+ Games$/.test(title)) classes.push(styles.titleSection)


  return <div style={{ width: `${width}px` }} className={classes.join(' ')} title={title}>{width >= 10 ? content : ''}</div>
};

export default RankGamesProgressSection;
