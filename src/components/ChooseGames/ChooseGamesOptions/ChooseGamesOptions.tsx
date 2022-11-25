import React, { FC, FormEvent, useEffect, useRef } from 'react';
import styles from './ChooseGamesOptions.module.scss';
import { ChooseGamesOptionsProps } from './ChooseGameOptions.props';
import SpecialSelect from '../../SpecialSelect/SpecialSelect';
import Icon from '../../Icon/Icon';
import { sortList, filterList } from './ChooseGamesOptions.consts';
import InputWithIcon from '../../InputWithIcon/InputWithIcon';
import { useNavigate, useParams } from 'react-router-dom';
// import SpecialCheckbox from '../../SpecialCheckbox/SpecialCheckbox';

const ChooseGamesOptions: FC<ChooseGamesOptionsProps> = ({ setSort, setFilter, setQuery }) => {
  const queryRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (queryRef.current) setQuery(queryRef.current.value);
  }, [queryRef, setQuery])

  const resetPage = () => {
    let { username } = params;
    navigate(`/choose/${username}/1`);
  }

  const updateQuery = (e: FormEvent) => {
    e.preventDefault();
    setQuery(queryRef.current?.value || '');
    resetPage();
  }

  const clearQuery = () => {
    setQuery('');
    resetPage();
  }

  const update = (fn: Function, s: string) => {
    fn(s);
    resetPage();
  }

  return <div className={styles.chooseGameOptions}>
    <Icon name='barsSort' className={styles.sortIcon} />
    <SpecialSelect setter={(s) => update(setSort, s)} options={sortList} />
    &emsp;
    <Icon name='barsFilter' className={styles.filterIcon} />
    <SpecialSelect setter={(s) => update(setFilter, s)} options={filterList} />
    {/* &emsp;
    <SpecialCheckbox setter={setExclude} labelText="Exclude Expansions"/> */}
    &emsp;
    <InputWithIcon icon='magnifyingGlass' refObj={queryRef} submitFn={updateQuery} outline clearButton clearSideEffect={clearQuery} />
  </div>
};

export default ChooseGamesOptions;
