export const getCollections = () =>{
    const collectionsFromStorge = JSON.parse(localStorage.getItem('collections'));
    return collectionsFromStorge || [];
};
