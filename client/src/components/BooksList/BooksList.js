import React, { Fragment } from "react";

import * as styles from './BooksList.module.scss';
import BookItem from "./BookItem";

const BooksList = ({ books = [] }) => {
  return (
    <Fragment>
      <h1 className={styles.books_list_title}>Search Result</h1>
      <div className={styles.books_list}>
        {books.map((book) => (
          <BookItem book={book} key={book.key} />
        ))}
      </div>
    </Fragment>
  );
};

export default BooksList;
