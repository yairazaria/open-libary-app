export const save = (key, data) => {
   return localStorage.setItem(key, JSON.stringify(data)) || [];
}

export const load = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export const clear = (key) => {
    return localStorage.removeItem(key);
}