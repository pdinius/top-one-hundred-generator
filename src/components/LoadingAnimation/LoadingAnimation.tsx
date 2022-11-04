import React, { FC, useEffect, useState } from 'react';
import styles from './LoadingAnimation.module.scss';
import seasons from '../../assets/seasons.jpg';
import fivetribes from '../../assets/fivetribes.jpg';
import cosmicencounter from '../../assets/cosmicencounter.jpg';
import pyramidarcade from '../../assets/pyramidarcade.jpg';



const LoadingAnimation: FC = () => {
  const images = [
    seasons,
    fivetribes,
    cosmicencounter,
    pyramidarcade
  ]

  let [idx, setIdx] = useState(0);

  useEffect(() => {
    let si: NodeJS.Timer;
    let st = setTimeout(() => {
      setIdx(i => i + 1);
      si = setInterval(() => {
        setIdx(i => i + 1);
      }, 5000)
    }, 2500)
    return () => {
      clearTimeout(st);
      clearInterval(si);
    };
  }, []);

  return (
    <div className={styles.loadingAnimation}>
      <div className={styles.boxContainer}>
        <div className={styles.boxBottomBottom}></div>
        <div className={styles.boxBottomLeft}></div>
        <div className={styles.boxBottomRight}></div>
        <div className={styles.boxBottomBack}></div>
        <div className={styles.boxBottomFront}></div>
        <div className={styles.boxTopContainer}>
          <img className={styles.boxTopTop} src={images[idx % images.length]} alt="Seasons" />
          <div className={styles.boxTopMask}></div>
          <div className={styles.boxTopLeft}></div>
          <div className={styles.boxTopRight}></div>
          <div className={styles.boxTopBack}></div>
          <div className={styles.boxTopFront}></div>
        </div>
      </div>
    </div>
  )
};

export default LoadingAnimation;
