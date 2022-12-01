import React, { FC } from 'react';
import styles from './RankGamesProgressSection.module.scss';
import { RankGamesProgressSectionProps } from './RankGamesProgressSection.props';

const RankGamesProgressSection: FC<RankGamesProgressSectionProps> = ({ width, current, title, content }) => {

  let classes = [styles.progressSection];
  switch (current) {
    case 'main':
      classes.push(styles.mainSection);
      break;
    case 'side':
      classes.push(styles.sideSection);
  }
  if (!/^\d+ Games$/.test(title)) classes.push(styles.titleSection)


  return <div style={{ width: `${width}px` }} className={classes.join(' ')} title={title}>{content}</div>
};

export default RankGamesProgressSection;
