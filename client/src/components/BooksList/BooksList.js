import React, { Fragment, useState, useEffect } from "react";

import * as styles from "./BooksList.module.scss";
import BookItem from "./BookItem";
import { getCollections } from "../../utils/utils";

const BooksList = ({ books = [] }) => {
  const [collections, setCollections] = useState([]);

  const setCollectionsFormStorage = () => {
    const collectionStorage = getCollections();
    if (collectionStorage.length < 0) return;
    else setCollections(collectionStorage);
  };

  useEffect(() => {
    setCollectionsFormStorage();
  }, []);

  return (
    <Fragment>
      <h1 className={styles.books_list_title}>Search Result</h1>
      <div className={styles.books_list}>
        {books.map((book) => (
          <BookItem
            book={book}
            key={book.key}
            books={books}
            collections={collections}
            setCollections={setCollections}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default BooksList;
