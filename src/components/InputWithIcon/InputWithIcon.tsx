import React, { FC, useMemo } from 'react';
import Icon from '../Icon/Icon';
import styles from './InputWithIcon.module.scss';
import { InputWithIconProps } from './InputWithIcon.props';

const InputWithIcon: FC<InputWithIconProps> = ({ icon, refObj, submitFn, outline, clearButton, clearSideEffect }) => {
  const clearInput = useMemo(() => {
    return () => {
      if (refObj.current) refObj.current.value = '';
      if(clearSideEffect) clearSideEffect();
    }
  }, [refObj, clearSideEffect])

  return <div className={styles.formContainer}>
    <Icon className={styles.inputIcon} name={icon}></Icon>
    <form onSubmit={submitFn}>
      <input type="text" ref={refObj} className={`${styles.textInput} ${outline ? styles.outlined : ''}`}></input>
    </form>
    { clearButton
    ? <Icon className={styles.clearButton} name='xmark' onClick={clearInput} />
    : <></> }
  </div>;
};

export default InputWithIcon;
