import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../interfaces/BggTypes";
import styles from "./RankGames.module.scss";
import { shuffle } from "../../utils/utility-functions";
import { RankGamesProps } from "./RankGames.props";
import SortCard from "./SortCard/SortCard";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const RankGames: FC<RankGamesProps> = () => {
  const params = useParams();

  const [selected, setSelected] = useState<Array<Game>>([]);
  const [pivot, setPivot] = useState<Game>();

  useEffect(() => {
    let { username } = params;
    if (!username) return;

    const games = localStorage.getItem(username);
    if (games) {
      let gamesList = JSON.parse(games).filter((g: Game) => g.selected);
      shuffle(gamesList);
      setSelected(gamesList);
      setPivot(gamesList[0]);
    }
  }, []);

  return (
    <div className={styles.rankGamesContainer}>
      <div className={styles.lesserGames}></div>
      <div className={styles.pivotGame}>
        { pivot === undefined
        ? <LoadingAnimation />
        : <SortCard game={pivot} /> }
      </div>
      <div className={styles.greaterGames}></div>
    </div>
  );
};

export default RankGames;
