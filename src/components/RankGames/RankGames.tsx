import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../interfaces/BggTypes";
import styles from "./RankGames.module.scss";
import { shuffle } from "../../utils/utility-functions";
import { RankGamesProps } from "./RankGames.props";
import SortCard from "./SortCard/SortCard";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import RankGamesProgress from "./RankGamesProgress/RankGamesProgress";
import PivotCard from "./PivotCard/PivotCard";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "@hello-pangea/dnd";
import Icon from "../Icon/Icon";
import { Columns, SortGroup } from "./RankGames.interfaces";
import RankedGamesList from "./RankedGamesList/RankedGamesList";

const totalGamesList = (arr: Array<SortGroup>) => {
  return arr.reduce((a,b) => {
    return a.concat(...Object.values(b));
  }, [] as Array<Game>).map(g => g.name);
}

const RankGames: FC<RankGamesProps> = () => {
  const params = useParams();

  const [sortGroupID, setSortGroupID] = useState(0);
  const [sortGroups, setSortGroups] = useState<Array<SortGroup>>([]);
  const [currentSortGroup, setCurrentSortGroup] = useState<SortGroup>();
  const [columns, setColumns] = useState<Columns>({
    "lesser-games": [],
    "greater-games": [],
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let { username } = params;
    if (!username) return;
    setFinished(false);

    const currUsernamesGames = localStorage.getItem(username);
    if (!currUsernamesGames) return;
    const games: Array<Game> = JSON.parse(currUsernamesGames).filter((g: Game) => g.selected);
    let currentLists = localStorage.getItem(`${username}_sorted`) || '[]';
    let loaded: Array<SortGroup> = JSON.parse(currentLists);
    let gameNames = totalGamesList(loaded);

    if (!loaded.length || games.length !== gameNames.length || games.some(g => !gameNames.includes(g.name))) {
      let selectedGames = shuffle(games);
      loaded = [
        {
          pivot: selectedGames[0],
          gamesToCompare: selectedGames.slice(9),
          lesser: [],
          greater: [],
          currentSortees: selectedGames.slice(1, 9)
        }
      ];
    }
    setSortGroups(loaded);

    let currentGroupIndex = Object.values(loaded).findIndex(sg => sg.gamesToCompare.length && (sg.lesser.length || sg.greater.length));
    if (currentGroupIndex === -1) currentGroupIndex = Object.values(loaded).findIndex(sg => sg.gamesToCompare.length);
    if (currentGroupIndex === -1) {
      setFinished(true);
      return;
    };

    setColumns({
      "lesser-games": loaded[currentGroupIndex].currentSortees,
      "greater-games": []
    })
    setCurrentSortGroup(loaded[currentGroupIndex]);
    setSortGroupID(currentGroupIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username]);

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

  const updatePivot = () => {
    if (!currentSortGroup || currentSortGroup.lesser.length || currentSortGroup.greater.length) return;

    let newGameList = shuffle(currentSortGroup.gamesToCompare.concat(currentSortGroup.pivot, currentSortGroup.currentSortees));
    setCurrentSortGroup({
      pivot: newGameList[0],
      gamesToCompare: newGameList.slice(9),
      currentSortees: newGameList.slice(1, 9),
      lesser: [],
      greater: []
    })
    setColumns({
      "lesser-games": newGameList.slice(1, 9),
      "greater-games": []
    })
  }

  const nextGroup = () => {
    if (!currentSortGroup) return;
    let updatedSortGroup = {
      ...currentSortGroup,
      lesser: currentSortGroup.lesser.concat(columns['lesser-games']),
      greater: currentSortGroup.greater.concat(columns['greater-games']),
      currentSortees: currentSortGroup.gamesToCompare.slice(0, 8),
      gamesToCompare: currentSortGroup.gamesToCompare.slice(8)
    }

    let updatedSortGroups: Array<SortGroup>;

    if (updatedSortGroup.currentSortees.length) {
      // Get 8 new games to compare
      setCurrentSortGroup(updatedSortGroup);
      setColumns({
        "lesser-games": currentSortGroup.gamesToCompare.slice(0, 8),
        "greater-games": []
      })

      updatedSortGroups = sortGroups.slice();
      updatedSortGroups[sortGroupID] = updatedSortGroup;
      setSortGroups(updatedSortGroups);
    } else {
      // New pivot group altogether
      updatedSortGroups = sortGroups.slice();
      shuffle(updatedSortGroup.lesser);
      shuffle(updatedSortGroup.greater);

      updatedSortGroups.splice(sortGroupID, 1, {
        pivot: updatedSortGroup.lesser[0],
        currentSortees: updatedSortGroup.lesser.slice(1, 9),
        gamesToCompare: updatedSortGroup.lesser.slice(9),
        lesser: [],
        greater: []
      }, {
        ...updatedSortGroup,
        lesser: [],
        greater: []
      }, {
        pivot: updatedSortGroup.greater[0],
        currentSortees: updatedSortGroup.greater.slice(1, 9),
        gamesToCompare: updatedSortGroup.greater.slice(9),
        lesser: [],
        greater: []
      });
      updatedSortGroups = updatedSortGroups.filter(g => g.pivot);

      let nextGroupIndex = updatedSortGroups.findIndex(sg => sg.currentSortees.length);
      setSortGroupID(nextGroupIndex);
      setSortGroups(updatedSortGroups);

      if (nextGroupIndex !== -1) {
        setCurrentSortGroup(updatedSortGroups[nextGroupIndex]);
        setColumns({
          "lesser-games": updatedSortGroups[nextGroupIndex].currentSortees,
          "greater-games": []
        });
      } else {
        setFinished(true);
      }
    }

    const { username } = params;
    if (username) {
      console.log(`Updating data for ${username}.`);
      localStorage.setItem(`${username}_sorted`, JSON.stringify(updatedSortGroups));
    }
  }

  return finished
    ? <RankedGamesList games={sortGroups} />
    : <div className={styles.rankGamesContainer}>
      <RankGamesProgress sortGroups={sortGroups} currentIndex={sortGroupID} />
      <div className={styles.rankGamesMainArea}>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* lesser games */}
          <div className={styles.droppableContainerLeft}>
            <span className={styles.columnTitle}>Worse Games <Icon className={styles.columnTitleIcon} name='thumbsDown' /></span>
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
                    {columns['lesser-games'].map((s, i) => (
                      <SortCard key={s.name} game={s} index={i} />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
          {/* pivot game */}
          <div className={styles.pivotGame}>
            {currentSortGroup?.pivot === undefined ? (
              <LoadingAnimation />
            ) : (
              <>
                <button onClick={nextGroup}>Next Group <Icon name="circleCaretRight" className={styles.buttonIcon} /></button>
                <PivotCard game={currentSortGroup.pivot} />
                {currentSortGroup?.greater.length || currentSortGroup?.lesser.length
                  ? <></>
                  : <button onClick={updatePivot}>New Pivot <Icon name="sparkles" className={styles.buttonIcon} /></button>}
              </>
            )}
          </div>
          {/* greater games */}
          <div className={styles.droppableContainerRight}>
            <span className={styles.columnTitle}>Better Games <Icon className={styles.columnTitleIcon} name='thumbsUp' /></span>
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
                    {columns['greater-games'].map((s, i) => (
                      <SortCard key={s.name} game={s} index={i} />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>

        </DragDropContext>
      </div>
    </div>;
};

export default RankGames;
