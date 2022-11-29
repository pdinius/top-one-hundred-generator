import React, { FC, useRef } from 'react';
import styles from './SpecialCheckbox.module.scss';
import { SpecialCheckboxProps } from './SpecialCheckbox.props';

const SpecialCheckbox: FC<SpecialCheckboxProps> = ({ setter, labelText }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const updateSetter = (e: React.MouseEvent<HTMLInputElement>) => {
    setter(Boolean(checkboxRef.current!.value));
  }

  return (<>
    <input type="checkbox" className={styles.checkBox} onClick={updateSetter} ref={checkboxRef} />
    <label className={'unselectable ' + styles.checkboxLabel} htmlFor="vehicle1"> {labelText}</label>
  </>);
};

export default SpecialCheckbox;
