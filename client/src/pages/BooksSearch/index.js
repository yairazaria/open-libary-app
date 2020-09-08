import React, { useState } from "react";

import * as styles from './BooksSearch.module.scss';
import { searchBooks } from "../../BooksApi/index";


export const BooksSearch = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [resultNotFound, setResultNotFound] = useState('');


  const getBooks = async (searchValue) => {
    const res = await searchBooks(searchValue);
    if (res && res.docs && res.docs.length > 0) {
      const books = res.docs;
      localStorage.setItem('books',JSON.stringify(books));
      setBooksList(books);
    }else{
      setBooksList([]);
      setResultNotFound('No Books Found');
    }
  };

  const onChange = (e) => {
    setSearchInputValue(e.target.value);
  };
  
  const handaleKeyDown = (e) =>{
    if (e.keyCode === 13) {
      getBooks(searchInputValue);
    };
  };

  console.log(booksList);

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
    </section>
  );
};
