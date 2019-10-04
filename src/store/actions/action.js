import * as types from "store/actionTypes";


export function setData(data) {
  return {
    type: types.SET_DATA,
    payload: data
  }
}

export function updateKeywords(keywords) {
  return {
    type: types.UPDATE_KEYWORDS,
    payload: keywords
  }
}


export function updateTitles(titles) {
  return {
    type: types.UPDATE_TITLES,
    payload: titles
  }
}