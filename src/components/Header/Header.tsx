import React, { FC, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputWithIcon from '../InputWithIcon/InputWithIcon';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';

const Header: FC<HeaderProps> = ({ totalSelectedGames, setUsername, username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (username) return;
    const user = localStorage.getItem('current_username');
    if (!user) return;
    setUsername(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitUsernameForm = (event: React.FormEvent) => {
    event.preventDefault();

    let name = usernameInput.current?.value;
    if (!name) return;
    setUsername(name);
    localStorage.setItem('current_username', name);

    let page = location.pathname.match(/rank|choose/);
    if (!page) {
      console.log(`What's going on with this page? ${location.pathname}`);
      return;
    }

    if (page[0] === 'choose') {
      navigate(`/choose/${name}/1`);
    } else if (page[0] === 'rank') {
      navigate(`/rank/${name}`)
    }
  }

  const switchTo = (route: string) => {
    let target = `/${route}/${username}`;
    if (route === 'choose') target += '/1';
    navigate(target);
  }

  return (<div className={styles.header}>
    <span className={styles.inputLabel}>username:</span>
    <InputWithIcon icon='user' refObj={usernameInput} submitFn={submitUsernameForm} />
    <button className={styles.pageLink} onClick={() => switchTo('choose')}>choose games</button>
    <button className={styles.pageLink} onClick={() => switchTo('rank')}>rank games</button>
    <div className={styles.pageInfo}>
      {
        location.pathname.startsWith('/choose')
        ? <>Total Selected Games: <div className={styles.selectedGames}>{totalSelectedGames}</div></>
        : ''
      }
    </div>
  </div>);
}

export default Header;
