import React, { Fragment, useState, useEffect } from "react";

import * as styles from "./BooksList.module.scss";
import BookItem from "./BookItem";
import { load } from "../../utils/utils";

const BooksList = ({ books = [] }) => {
  const [collections, setCollections] = useState([]);

  const setCollectionsFormStorage = () => {
    const collectionStorage = load("collections");
    if (collectionStorage?.length === 0) return;
    else setCollections(collectionStorage);
  };

  useEffect(() => {
    setCollectionsFormStorage();
  }, []);

  return (
    <Fragment>
      <div className={styles.books_list}>
        {books?.length > 0 ? books.map((book) => (
          <BookItem
            book={book}
            key={book.key}
            books={books}
            collections={collections}
            setCollections={setCollections}
          />
        )) : null}
      </div>
    </Fragment>
  );
};

export default BooksList;
