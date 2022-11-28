import React, { FC } from "react";
import { truncate } from "../../../utils/utility-functions";
import styles from "./SortCard.module.scss";
import { SortCardProps } from "./SortCard.props";

const SortCard: FC<SortCardProps> = ({
  game: { thumbnail, name, year_published },
}) => {
  return (
    <div className={styles.sortCardContainer} title={name}>
      <div className={styles.thumbnailContainer}>
        <img src={thumbnail} alt={name} />
      </div>
      <div className={styles.sortCardRightSide}>
        <span className={styles.title}>{truncate(name, 25)}</span>
        <span className={styles.year}>{year_published}</span>
      </div>
    </div>
  );
};

export default SortCard;
