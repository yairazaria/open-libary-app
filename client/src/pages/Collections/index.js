import React, { useState, useEffect } from "react";


import * as style from "./Collections.module.scss";
import { CreateCollection } from "../../components/Collections/CreateCollection";
import { getCollections } from '../../utils/utils';


export const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const collectionFromStorge = getCollections();
    setCollections(collectionFromStorge);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);


  return (
    <section>
      <div className={style.collections_header}>
      <h1>Books collections</h1>
      <CreateCollection
        setCollections={setCollections}
        collections={collections}
        />
      </div>
    </section>
  );
};
