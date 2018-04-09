import storage from 'good-storage'

const SEARCH_KEY = '__SEARCH__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__FAVORITE__';
const FAVORITE_MAX_LENGTH = 200;

function insetArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  insetArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}

function deleteFormatArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFormatArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, []);
  insetArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH);
  storage.set(PLAY_KEY, songs);
  return songs;
}

export function loadPlay() {
  return storage.get(PLAY_KEY, []);
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, []);
  insetArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, []);
  deleteFormatArray(songs, (item) => {
    return song.id === item.id;
  })
  storage.set(FAVORITE_KEY, songs);
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, []);
}
