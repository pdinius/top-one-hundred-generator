import React, { FC } from 'react';
import Icon from '../Icon/Icon';
import styles from './SpecialSelect.module.scss';
import { SpecialSelectProps } from './SpecialSelect.props';

const SpecialSelect: FC<SpecialSelectProps> = ({ options, setter }) => {
  const updateSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
  }

  return (<div className={styles.specialSelectContainer}>
    <select className={styles.specialSelect} onChange={updateSetter}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>);
};

export default SpecialSelect;
