import React, { FC, useState } from 'react';
import SpecialCheckbox from '../../SpecialCheckbox/SpecialCheckbox';
import styles from './RankGamesOptions.module.scss';
import { RankGamesOptionsProps } from './RankGamesOptions.props';

const RankGamesOptions: FC<RankGamesOptionsProps> = () => {
  const [check, setCheck] = useState(false);

  return <div className={styles.rankGameOptions}>
    <SpecialCheckbox labelText='Change' setter={setCheck}></SpecialCheckbox>
  </div>;
}

export default RankGamesOptions;
