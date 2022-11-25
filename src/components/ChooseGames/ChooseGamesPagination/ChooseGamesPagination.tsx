import React, { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import styles from './ChooseGamesPagination.module.scss';
import { ChooseGamesPaginationProps } from './ChooseGamesPagination.props';

const ChooseGamesPagination: FC<ChooseGamesPaginationProps> = ({ numPages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const setPage = (n: string) => {
    let path = location.pathname.split('/').slice(1);
    navigate(`/${path.slice(0, 2).join('/')}/${n}`);
  }

  const numbersArr = Array.from({ length: numPages }, (_, i) => i + 1).filter(n => Math.abs(Number(params.page) - n) < 6).map(String);

  if (numbersArr[0] !== '1') numbersArr.unshift('1', '...')
  if (numbersArr[numbersArr.length - 1] !== String(numPages)) numbersArr.push('...', String(numPages));

  return <div className={styles.chooseGamesPagination}>
    {
      numbersArr.map((v,i) => {
        return v === '...'
          ? <Icon name='ellipsis' className={styles.ellipsis} key={i === 1 ? 'ellipsis-A' : 'ellipsis-B'} />
          : <div className={`${styles.pageNumber} ${v === params.page ? styles.currentPage : ''}`} onClick={() => setPage(v)} key={v}>{v}</div>
      })
    }
  </div>
};

export default ChooseGamesPagination;
