const getApiSearchUrl = (searchTerm) =>
  `http://openlibrary.org/search.json?q=${searchTerm}`;

export const getBookCoverByOLID = (olid) => {
  return olid ? 
    `http://covers.openlibrary.org/b/olid/${olid}-M.jpg` :
    'https://admin.johnsons.net/janda/files/flipbook-coverpage/nocoverimg.jpg';
}

export const searchBooks = (searchTerm = "") => {
  return fetch(getApiSearchUrl(searchTerm)).then((r) => r.json());
};
