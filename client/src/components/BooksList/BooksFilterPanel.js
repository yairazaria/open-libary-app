import React, { Fragment, useState, useEffect } from "react";

import * as style from "./BookItem.module.scss";

export const BooksFilterPanel = ({
  booksList,
  setFilterBooksList,
  setFilterMode,
  isFetching,
}) => {
  const [authorInputValue, setAuthorInputValue] = useState("");
  const [publicationYear, setPublicationYear] = useState({
    from: 0,
    to: 0,
  });

  useEffect(() => {
    if (authorInputValue.length > 2 && !shouldFilterByYears()) {
      setFilterMode(true);
      authorFilter();
    } else if (authorInputValue.length > 2) {
      setFilterMode(true);
    } else setFilterMode(false);
  }, [authorInputValue, publicationYear]);

  const authorFilter = () => {
    if (authorInputValue.length > 2) {
      const filterdBooks = booksList.filter((book) => {
        const authorName = book.author_name && book.author_name[0];
        const publisYear = Number(
          book.first_publish_year || (book.publish_date && book.publish_date[0])
        );
        let isMatched = false;
        if (
          publisYear &&
          authorName &&
          publicationYear.to &&
          publicationYear.from
        ) {
          const { from, to } = publicationYear;
          isMatched = authorName
            .toLowerCase()
            .includes(authorInputValue.toLowerCase());
          if (
            publisYear >= Number(from) &&
            publisYear <= Number(to) &&
            isMatched
          )
            return book;
        } else if (authorName) {
          isMatched = authorName
            .toLowerCase()
            .includes(authorInputValue.toLowerCase());
          if (isMatched) return book;
        }
      });
      console.log(filterdBooks, "filterdBooks");
      return setFilterBooksList(filterdBooks);
    } else {
      console.log("bad");
    }
  };

  const handleYearsChange = (e) => {
    setPublicationYear({ ...publicationYear, [e.target.name]: e.target.value });
  };

  const handleOnChange = (e) => {
    setAuthorInputValue(e.target.value);
    authorFilter();
  };

  const shouldFilterByYears = () => {
    if (publicationYear.to > 0 && publicationYear.from > 0) {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      <label>Filter By :</label>
      <div className={style.panel_container}>
        <div className={style.input_group}>
          <label>Author Name</label>
          <input
            className={style.filter_input}
            type="text"
            value={authorInputValue}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Years Range</label>
          <div className={style.input_group}>
            <label>from</label>
            <input
              className={style.filter_input}
              type="number"
              name="from"
              placeholder="from"
              value={publicationYear.from}
              onChange={(e) => handleYearsChange(e)}
            />
          </div>
          <div className={style.input_group}>
            <label>to</label>
            <input
              type="number"
              name="to"
              placeholder="to"
              value={publicationYear.to}
              onChange={(e) => handleYearsChange(e)}
              className={style.filter_input}
            />
          </div>

          <button onClick={authorFilter} disabled={!shouldFilterByYears()}>
            apply years
          </button>
        </div>
      </div>
    </Fragment>
  );
};
