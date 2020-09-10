import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import * as styles from './BooksSearch.module.scss';
import { searchBooks } from "../../BooksApi/index";
import { getBooksList } from '../../utils/utils';
import BooksList from "../../components/BooksList/BooksList";
import Spinner from "../../components/Spinner/Spinner";

export const BooksSearch = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [resultNotFound, setResultNotFound] = useState("");

  useEffect(() =>{
    const booksListFromStorge = getBooksList();
    if(booksListFromStorge.length < 0) return;
    setBooksList(booksListFromStorge);
  },[])
  
  const getBooks = async (searchValue) => {
    const res = await searchBooks(searchValue);
    if (res && res.docs && res.docs.length > 0) {
      const books = res.docs;
      setIsFetching(false);
      setBooksList(books);
      localStorage.setItem('books',JSON.stringify(books));
    }else{
      setIsFetching(false);
      setBooksList([]);
      setResultNotFound('No Books Found');
    }
  };
  
  const onChange = (e) => {
    setSearchInputValue(e.target.value);
  };
  
  const handaleKeyDown = (e) =>{
    if (e.keyCode === 13 || e.type === 'click') {
      setIsFetching(true);
      getBooks(searchInputValue);
    };
  };

  const shouldDisplayBookList = booksList && booksList.length > 0;
  const noResult = <h3 style={{ textAlign: "center" }}>{resultNotFound}</h3>;

  return (
    <section>
      <div className={styles.search_container}>
      <h1>Search books</h1>
      <div className={styles.input_container}>
      <FontAwesomeIcon icon={faSearch} className={styles.search_icon} onClick={(e) => handaleKeyDown(e)}/>
      <input
        className={styles.search_input}
        type="text"
        value={searchInputValue}
        onChange={(e) => onChange(e)}
        onKeyDown={handaleKeyDown}
      />
      </div>
      </div>
      {!isFetching ? (shouldDisplayBookList ? <BooksList books={booksList}/> : noResult) : <Spinner />}
    </section>
  );
};
