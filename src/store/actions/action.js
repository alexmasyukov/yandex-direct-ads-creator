import { SET_TITLES } from "store/actionTypes";

export function setTitles(titles) {
  return {
    type: SET_TITLES,
    payload: titles
  }
}