import { newsApi } from '../api'

const SET_STORY = 'SET_STORY'
const ADD_COMMENT = 'ADD_COMMENT'
const SET_STORY_LOADING = 'SET_STORY_LOADING'
let initialState = {
  story: {
    by: '',
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    time: 0,
    title: '',
    type: '',
    url: '',
  },
  comments: [],
  isLoading: false,
}
const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORY: {
      return {
        ...state,
        story: action.story,
      }
    }
    case ADD_COMMENT: {
      if (state.comments.some((el) => el?.id === action.comm.id)) {
        return state
      }
      return {
        ...state,
        comments: [...state.comments, action.comm],
      }
    }
    case SET_STORY_LOADING: {
      return {
        ...state,
        isLoading: action.val,
      }
    }
    default:
      return state
  }
}
export const setStoryAC = (story) => ({
  type: SET_STORY,
  story,
})
export const addCommentAC = (comm) => ({
  type: ADD_COMMENT,
  comm,
})
export const setLoadingAC = (val) => ({
  type: SET_STORY_LOADING,
  val,
})
export const requestStory = (id) => async (dispatch) => {
  dispatch(setLoadingAC(true))
  newsApi.getInfoById(id).then((story) => {
    dispatch(setStoryAC(story))
    dispatch(setLoadingAC(false))
  })
}
export const requestComments = (parentId, listId) => async (dispatch) => {
  newsApi.getInfoById(parentId).then((obj) => {
    if (!!obj.kids) {
      let promises = obj.kids.map((com) => {
        return newsApi.getInfoById(com)
      })
      Promise.all(promises).then((arr) => {
        arr.map((el) => {
          dispatch(addCommentAC(el))
        })
      })
    }
  })
}
export default storyReducer
