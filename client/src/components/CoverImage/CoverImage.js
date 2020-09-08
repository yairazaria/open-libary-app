import React from 'react';

import { getBookCoverByOLID } from '../../BooksApi/index';

export const CoverImage = ({olid}) => {
    return <img src={getBookCoverByOLID(olid)} width="180px" height="270px" alt=''/>;
}
