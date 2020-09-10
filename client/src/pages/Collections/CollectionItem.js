import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCheckSquare,
  faTrashAlt,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Collections.module.scss";
import { AddToast } from "../../components/Toast/AddToast";
import { CoverImage } from "../../components/CoverImage/CoverImage";

export const CollectionItem = ({ collection, collections, setCollections }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [hideSelectList, showSelectList] = useState(false);
  const [collectionSelected, setCollectionSelected] = useState("");
  const [editedCollection, setEditedCollection] = useState(collection);

  const deleteCollection = (id) => {
    const collectionsAfterFilter = collections.filter((c) => c.id !== id);
    setCollections(collectionsAfterFilter);
    AddToast(true, "Collection Deleted");
  };

  const updateCollection = () => {
    if (editedCollection.name === "")
      return AddToast(false, "Collection Name can Not be empty");

    const isCollectionExist = collections.some(
      (collection) => collection.name === editedCollection.name
    );

    if (isCollectionExist)
      return AddToast(
        false,
        "This Collection Name is Exist, Try another name",
        "top-center"
      );

    const newCollections = collections.map((c) => {
      if (c.id === collection.id) return editedCollection;
      return c;
    });

    setCollections(newCollections);
    setEditMode(false);
    AddToast(true, "Collection is Updated");
  };

  const handleOnChange = (e) => {
    setEditedCollection({
      ...editedCollection,
      [e.target.name]: e.target.value,
    });
  };

  const deleteBookFromCollection = (bookKey) => {
    const books = collection.books.filter((b) => b.key !== bookKey);
    const newEditedCollection = {
      ...editedCollection,
      books,
    };

    const newCollections = collections.map((c) => {
      if (c.id === collection.id) return newEditedCollection;
      return c;
    });

    setEditedCollection(newEditedCollection);
    setCollections(newCollections);
  };

  const moveBookFromCollection = (e, bookKey) => {
    const selectedValue = e.target.value;

    if (collections.length < 0)
      return AddToast(false, "Create Collection First ");
    const collectionToAdd = collections.find((c) => c.id === selectedValue);

    const bookToMove = collection.books.find((b) => b.key === bookKey);
    if (!bookToMove) return AddToast(false, "Book Not Found :(");

    const isBookAlreadyInCollection = collectionToAdd.books.some(
      (b) => b.key === bookKey
    );
    if (isBookAlreadyInCollection)
      return AddToast(false, "Book Already Exist In Collection ");

    const books = collection.books.filter((b) => b.key !== bookKey);
    collectionToAdd.books.push(bookToMove);
    const newEditedCollection = {
      ...editedCollection,
      books,
    };

    const newCollections = collections.map((c) => {
      if (c.id === collection.id) return newEditedCollection;
      return c;
    });

    setEditedCollection(newEditedCollection);
    setCollections(newCollections);
    showSelectList(false);
    AddToast(
      true,
      `the book moved successfuly to ${collectionToAdd.name} collection`
    );
  };

  return (
    <Fragment>
      <div className={styles.collection_content}>
        <div className={styles.collection_header}>
          {isEditMode ? (
            <div className={styles.edit_name_container}>
              <input
                placeholder="Add New Name"
                name="name"
                className={styles.edit_input}
                value={editedCollection.name}
                onChange={(e) => handleOnChange(e)}
              />
              <FontAwesomeIcon
                className={styles.check_icon}
                icon={faCheckSquare}
                onClick={() => updateCollection()}
              />
            </div>
          ) : (
            <div className={styles.title_and_delete}>
              <div>
                <h3>{collection.name}</h3>
                {isEditMode ? null : (
                  <FontAwesomeIcon
                    className={styles.edit_icon}
                    icon={faPen}
                    onClick={() => setEditMode(true)}
                  />
                )}
              </div>
              <FontAwesomeIcon
                className={styles.delete_icon}
                icon={faTrashAlt}
                onClick={() => deleteCollection(collection.id)}
              />
            </div>
          )}
        </div>
        <div className={styles.collection_books}>
          {collection.books.length === 0 ? (
            <h4>No Have Books yet, Add some</h4>
          ) : (
            collection.books.map((book) => (
              <div key={book.key} className={styles.book_item}>
                <div className={styles.card_info}>
                  <div className={styles.actionsContainer}>
                    <FontAwesomeIcon
                      className={styles.delete_book_icon}
                      icon={faTrashAlt}
                      onClick={() => deleteBookFromCollection(book.key)}
                    />
                    <FontAwesomeIcon
                      className={styles.move_book_icon}
                      icon={faShareSquare}
                      onClick={() => showSelectList(true)}
                    />

                    {hideSelectList ? (
                      <select
                        value={collectionSelected}
                        onChange={(e) => moveBookFromCollection(e, book.key)}
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
                          collections.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))
                        )}
                      </select>
                    ) : null}
                  </div>
                  <CoverImage olid={book.cover_edition_key} />
                  <p>{book.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};
