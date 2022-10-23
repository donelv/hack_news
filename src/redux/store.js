import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './news-reducer'
import storyReducer from './story-reducer'
const store = configureStore({
  reducer: {
    newsPage: newsReducer,
    storyPage: storyReducer,
  },
})

export default store
