import React, { FC } from "react";
import { truncate } from "../../../utils/utility-functions";
import styles from "./SortCard.module.scss";
import { SortCardProps } from "./SortCard.props";

const SortCard: FC<SortCardProps> = ({
  game: { thumbnail, name, year_published },
}) => {
  return (
    <div className={styles.sortCardContainer}>
      <div className={styles.thumbnailContainer}>
        <img src={thumbnail} />
      </div>
      <div className={styles.sortCardRightSide}>
        <span className={styles.title}>{truncate(name, 30)}</span>
        <span className={styles.year}>{year_published}</span>
      </div>
    </div>
  );
};

export default SortCard;
