const { localStorage } = window;

const saveKey = (key, str) => localStorage.setItem(key, str);
const deleteKey = key => delete localStorage.removeItem(key);
const checkKey = key => localStorage[key];
const getKey = key => localStorage.getItem(key);

const setLocale = locale => localStorage.setItem('locale', locale);

export { saveKey, deleteKey, checkKey, getKey, setLocale };
