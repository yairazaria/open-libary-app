import React, { Fragment, useState, useEffect } from "react";

import * as style from "./BooksFilterPanel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const BooksFilterPanel = ({
  booksList,
  setFilterBooksList,
  setFilterMode,
}) => {
  const [authorInputValue, setAuthorInputValue] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const [publicationYear, setPublicationYear] = useState({
    from: "",
    to: "",
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
      return setFilterBooksList(filterdBooks);
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
    if (publicationYear.to > 0 && publicationYear.from > 0) return true;
    return false;
  };

  const handleFilterChange = () => {
    if (!filterToggle) setFilterToggle(true);
    else setFilterToggle(false);
  };

  return (
    <Fragment>
      <div className={style.button_container}>
        <button onClick={handleFilterChange}>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
      </div>
      <div
        className={
          filterToggle
            ? style.hide_edit_filter_container
            : style.edit_filter_container
        }
      >
        <div className={style.author_input}>
          <label>Author Name :</label>
          <input
            className={style.filter_input}
            type="text"
            placeholder="Author Name"
            value={authorInputValue}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className={style.years_range_container}>
          <label>Years Range :</label>
          <div className={style.years_range_inputs}>
            <input
              type="number"
              name="from"
              placeholder="from"
              value={publicationYear.from}
              onChange={(e) => handleYearsChange(e)}
            />
            <input
              type="number"
              name="to"
              placeholder="to"
              value={publicationYear.to}
              onChange={(e) => handleYearsChange(e)}
            />
          </div>
        </div>
        <button
          className={style.apply_button}
          onClick={authorFilter}
          disabled={!shouldFilterByYears()}
        >
          apply
        </button>
      </div>
    </Fragment>
  );
};
