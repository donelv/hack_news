import { newsApi } from '../api'

const SET_NEWS = 'SET_NEWS'
const SET_NEWS_LOADING = 'SET_NEWS_LOADING'

let initialState = {
  news: [],
  isLoading: false,
}
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS: {
      return {
        ...state,
        news: action.news,
      }
    }
    case SET_NEWS_LOADING: {
      return {
        ...state,
        isLoading: action.val,
      }
    }
    default:
      return state
  }
}
export const setNewsAC = (news) => ({
  type: SET_NEWS,
  news,
})
export const setLoadingAC = (val) => ({
  type: SET_NEWS_LOADING,
  val,
})
export const requestNews = () => async (dispatch) => {
  dispatch(setLoadingAC(true))
  let newsIds = await newsApi.getNewsId()
  let promises = newsIds.slice(0, 100).map((el) => {
    return newsApi.getInfoById(el)
  })
  Promise.all(promises).then((arr) => {
    dispatch(setNewsAC(arr))
    dispatch(setLoadingAC(false))
  })
}
export default newsReducer
