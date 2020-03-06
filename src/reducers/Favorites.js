import { types } from '../actions/Favorites'

export default (state = { favorites: {} }, action) => {
  switch (action.type) {
    case types.ADD_FAVORITE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.movie.id]: action.movie
        }
      }

    case types.REMOVE_FAVORITE:
      const favorites = Object.assign({}, state.favorites)
      if (favorites[action.movieId]) delete favorites[action.movieId]
      return {
        ...state,
        favorites
      }

    default:
      return state
  }
}
