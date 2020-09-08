import React from "react";

import * as styles from "./BookItem.module.scss";
import { CoverImage } from "../CoverImage/CoverImage";

const BookItem = ({ book : { cover_edition_key, title, author_name, first_publish_year  }}) => {
  return (
    <div className={styles.book_item}>
      <CoverImage olid={cover_edition_key}/>
      <div className={styles.book_deatils}>
      <p className={styles.book_title}>{title}</p>
      <p className={styles.author_name}>{author_name}</p>
      <p>{first_publish_year}</p>
      </div>
    </div>
  );
};

export default BookItem;
