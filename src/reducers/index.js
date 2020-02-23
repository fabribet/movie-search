import { combineReducers } from 'redux'
import Favorites from './Favorites'
import TMDB from './TMDB'

export default combineReducers({
  Favorites,
  TMDB
})
