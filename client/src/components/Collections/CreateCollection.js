import React, { useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./CreateCollection.module.scss";
import { AddToast } from "../Toast/AddToast";

export const CreateCollection = ({ setCollections, collections }) => {
  const [collectionNameInput, setCollectionNameInput] = useState("");

  const handleOnChange = (e) => {
    setCollectionNameInput(e.target.value);
  };

  const addToCollections = () => {
    const isCollectionExist = collections.some(
      (collection) => collection.name === collectionNameInput
    );

    if (!collectionNameInput)
      return AddToast(false, "Collection Name can not be empty", "top-center");
    if (isCollectionExist)
      return AddToast(
        false,
        "This Collection Name is Exist, Try another name",
        "top-center"
      );

    const collection = {
      id: uuidv4(),
      name: collectionNameInput,
      books: [],
    };
    setCollections([...collections, collection]);
    setCollectionNameInput("");
    return AddToast(true, "Collection Added successfuly", "top-center");
  };

  return (
    <div className={styles.add_collection_container}>
      <label> Add New Collection</label>
      <Fragment>
        <input
          type="text"
          onChange={(e) => handleOnChange(e)}
          value={collectionNameInput}
          className={styles.add_collection_input}
          placeholder="Add New Collection"
        />
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => addToCollections()}
          className={styles.add_collection_icon}
         />
      </Fragment>
    </div>
  );
};

 
