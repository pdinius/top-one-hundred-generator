import React, { FC } from 'react';
import styles from './SpecialCheckbox.module.scss';
import { SpecialCheckboxProps } from './SpecialCheckbox.props';

const SpecialCheckbox: FC<SpecialCheckboxProps> = ({ setter, labelText }) => {
  const updateSetter = (e: React.MouseEvent<HTMLInputElement>) => {
    setter(e.currentTarget.checked);
  }

  return (<>
    <input type="checkbox" id="vehicle1" name="vehicle1" onClick={updateSetter} />
    <label className={'unselectable ' + styles.checkboxLabel} htmlFor="vehicle1"> {labelText}</label>
  </>);
};

export default SpecialCheckbox;
