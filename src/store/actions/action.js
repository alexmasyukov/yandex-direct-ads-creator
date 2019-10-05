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

export function updateFormField(object) {
  return {
    type: types.UPDATE_FORM_FIELD,
    payload: object
  }
}

export function setAdsPageCache(cache) {
  return {
    type: types.SET_ADS_PAGE_CACHE,
    payload: cache
  }
}

export function setTitlesPageCache(cache) {
  return {
    type: types.SET_TITLES_PAGE_CACHE,
    payload: cache
  }
}

export function setTitlesDatagridCache(cache) {
  console.log('setTitlesDatagridCache', cache);
  return {
    type: types.SET_TITLES_DATAGRID_CACHE,
    payload: cache
  }
}