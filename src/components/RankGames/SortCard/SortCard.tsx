import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import React, { FC } from "react";
import { truncate } from "../../../utils/utility-functions";
import styles from "./SortCard.module.scss";
import { SortCardProps } from "./SortCard.props";

const SortCard: FC<SortCardProps> = ({
  game: { thumbnail, name, year_published },
  index
}) => {
  return (
    <Draggable key={name} draggableId={name} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }: DraggableProvided) => {
        return <div
          className={styles.sortCardContainer}
          title={name}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}>
          <div className={styles.thumbnailContainer}>
            <img src={thumbnail} alt={name} />
          </div>
          <div className={styles.sortCardRightSide}>
            <span className={styles.title}>{truncate(name, 25)}</span>
            <span className={styles.year}>{year_published}</span>
          </div>
        </div>
      }}
    </Draggable>
  );
};

export default SortCard;
