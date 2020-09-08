import React, { useState } from "react";

import * as styles from "./BooksSearch.module.scss";
import { searchBooks } from "../../BooksApi/index";
import Spinner from "../../components/Spinner/Spinner";
import BooksList from "../../components/BooksList/BooksList";

export const BooksSearch = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [resultNotFound, setResultNotFound] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const getBooks = async (searchValue) => {
    const res = await searchBooks(searchValue);
    if (res && res.docs && res.docs.length > 0) {
      const books = res.docs;
      setIsFetching(false);
      localStorage.setItem("books", JSON.stringify(books));
      setBooksList(books);
    } else {
      setIsFetching(false);
      setBooksList([]);
      setResultNotFound("No Books Found");
    }
  };

  const onChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handaleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setIsFetching(true);
      getBooks(searchInputValue);
    }
  };

  const shouldDisplayBookList = booksList && booksList.length > 0;
  const noResult = <h3 style={{ textAlign: "center" }}>{resultNotFound}</h3>;

  return (
    <section>
      <div className={styles.search_container}>
        <h1>Search books</h1>
        <div className={styles.input_container}>
          <input
            className={styles.search_input}
            type="text"
            value={searchInputValue}
            onChange={(e) => onChange(e)}
            onKeyDown={handaleKeyDown}
          />
        </div>
      </div>
      {isFetching ? <Spinner /> : (
        shouldDisplayBookList ? (
          <BooksList books={booksList} />
        ) : (
          noResult
        )
      )}
    </section>
  );
};
