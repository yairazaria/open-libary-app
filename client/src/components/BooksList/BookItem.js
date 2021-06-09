import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./BookItem.module.scss";
import { CoverImage } from "../CoverImage/CoverImage";
import { AddToast } from "../Toast/AddToast";
import { save } from "../../utils/utils";

const BookItem = ({ book, books, collections, setCollections }) => {
  const [hideSelectList, showSelectList] = useState(false);
  const [collectionSelected, setCollectionSelected] = useState("");

  const addBookToCollection = (e, bookKey) => {
    const selectedValue = e.target.value;
    if (collections.length < 0)
      return AddToast(false, "Create Collection First ");

    const collectionToAdd = collections.find((c) => c.id === selectedValue);

    const bookToAdd = books.find((b) => b.key === bookKey);
    if (!bookToAdd) return AddToast(false, "Book Not Found :(");

    const isBookAlreadyInCollection = collectionToAdd.books.some(
      (b) => b.key === bookKey
    );

    if (isBookAlreadyInCollection)
      return AddToast(false, "Book Already Exist In Collection ");

    collectionToAdd.books.push(bookToAdd);
    save("collections", collections)
    showSelectList(false);
    AddToast(
      true,
      `the book added successfuly to ${collectionToAdd.name} collection`
    );
  };

  return (
    <div className={styles.book_item}>
      <div className={styles.card_container}>
        <div className={styles.add_book_container}></div>

        <div className={styles.card_info}>
          <div className={styles.actionsContainer}>
            <FontAwesomeIcon
              className={styles.image_icon}
              icon={faBookMedical}
              onClick={() => showSelectList(true)}
            />
            {hideSelectList ? (
              <select
                value={collectionSelected}
                onChange={(e) => addBookToCollection(e, book.key)}
              >
                <option disabled value={collectionSelected}>
                  {" "}
                  select collection{" "}
                </option>
                {collections.length < 0 ? (
                  <option value="No have collections">
                    No have collections
                  </option>
                ) : (
                  collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))
                )}
              </select>
            ) : null}
          </div>
          <CoverImage olid={book.cover_edition_key} />
        </div>
      </div>

      <div className={styles.book_deatils}>
        <p className={styles.book_title}>{book.title}</p>
        <p className={styles.author_name}>{book.author_name}</p>
        <p>{book.first_publish_year}</p>
      </div>
    </div>
  );
};

export default BookItem;
