import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./BooksSearch.module.scss";
import { searchBooks } from "../../BooksApi/index";
import { save, load } from "../../utils/utils";
import BooksList from "../../components/BooksList/BooksList";
import Spinner from "../../components/Spinner/Spinner";
import { BooksFilterPanel } from "../../components/BooksList/BooksFilterPanel";

export const BooksSearch = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [filterBooksList, setFilterBooksList] = useState(booksList);
  const [isFilterMode, setFilterMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [resultNotFound, setResultNotFound] = useState("");

  useEffect(() => {
    const booksListFromStorge = load('books');
    if (booksListFromStorge.length === 0) return;
    setBooksList(booksListFromStorge);
  }, []);

  const getBooks = async (searchValue) => {
    const res = await searchBooks(searchValue);
    if (res?.docs?.length > 0) {
      const books = res.docs;
      setIsFetching(false);
      setBooksList(books);
      save("books", books)
    } else {
      setIsFetching(false);
      setBooksList([]);
      setResultNotFound("No Books Found");
    }
    setFilterMode(false);
  };

  const onChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handaleKeyDown = (e) => {
    if (e.keyCode === 13 || e.type === "click") {
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
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.search_icon}
            onClick={(e) => handaleKeyDown(e)}
          />
          <input
            className={styles.search_input}
            type="text"
            value={searchInputValue}
            onChange={(e) => onChange(e)}
            onKeyDown={handaleKeyDown}
          />
        </div>
      </div>

      {!isFetching ? (
        shouldDisplayBookList ? (
          <Fragment>
            <h1 className={styles.books_list_title}>Search Result</h1>
            <BooksFilterPanel
              booksList={booksList}
              setFilterBooksList={setFilterBooksList}
              setFilterMode={setFilterMode}
            />
            <BooksList books={isFilterMode ? filterBooksList : booksList} />
          </Fragment>
        ) : (
          noResult
        )
      ) : (
        <Spinner />
      )}
    </section>
  );
};
