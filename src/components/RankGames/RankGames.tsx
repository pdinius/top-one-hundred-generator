import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../interfaces/BggTypes";
import styles from "./RankGames.module.scss";
import { shuffle } from "../../utils/utility-functions";
import { RankGamesProps } from "./RankGames.props";
import SortCard from "./SortCard/SortCard";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import RankGamesOptions from "./RankGamesOptions/RankGamesOptions";
import PivotCard from "./PivotCard/PivotCard";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "@hello-pangea/dnd";

interface Columns {
  "lesser-games": Array<Game>;
  "greater-games": Array<Game>;
}

const RankGames: FC<RankGamesProps> = () => {
  const params = useParams();

  const [selected, setSelected] = useState<Array<Game>>([]);
  const [pivot, setPivot] = useState<Game>();
  const [columns, setColumns] = useState<Columns>({
    "lesser-games": [],
    "greater-games": [],
  });

  useEffect(() => {
    let { username } = params;
    if (!username) return;

    const games = localStorage.getItem(username);
    if (games) {
      let gamesList = JSON.parse(games).filter((g: Game) => g.selected);
      shuffle(gamesList);
      setSelected(gamesList);
      setColumns({
        "lesser-games": gamesList.slice(1, 9),
        "greater-games": [],
      });
      setPivot(gamesList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as keyof Columns];
      const destColumn = columns[destination.droppableId as keyof Columns];

      const sourceItems = sourceColumn.slice();
      const destItems = destColumn.slice();
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        "lesser-games":
          source.droppableId === "lesser-games" ? sourceItems : destItems,
        "greater-games":
          source.droppableId === "greater-games" ? sourceItems : destItems,
      });
    } else {
      const column = columns[source.droppableId as keyof Columns];
      const copiedItems = column.slice();
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: copiedItems,
      });
    }
  };

  useEffect(() => {
    console.log(columns)
  }, [columns])

  return (
    <div className={styles.rankGamesContainer}>
      <RankGamesOptions />
      <div className={styles.rankGamesMainArea}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key="lesser-games" droppableId="lesser-games">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => {
              return (
                <div
                  className={styles.lesserGames}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns["lesser-games"].map((s, i) => (
                    <SortCard key={s.name} game={s} index={i} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <div className={styles.pivotGame}>
            {pivot === undefined ? (
              <LoadingAnimation />
            ) : (
              <PivotCard game={pivot} />
            )}
          </div>
          <Droppable key="greater-games" droppableId="greater-games">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => {
              return (
                <div
                  className={styles.greaterGames}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns["greater-games"].map((s, i) => (
                    <SortCard key={s.name} game={s} index={i} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default RankGames;
