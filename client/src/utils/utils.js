export const getCollections = () =>{
    const collectionsFromStorge = JSON.parse(localStorage.getItem('collections'));
    return collectionsFromStorge || [];
};


export const getBooksList = () =>{
    const booksListFromStorge = JSON.parse(localStorage.getItem('books'));
    return booksListFromStorge || [];
};