export const types = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE'
}

export const actions = {
  /**
   * Generates an Add Favorite Action
   */
  AddFavorite (movie) {
    return {
      type: types.ADD_FAVORITE,
      movie
    }
  },

  /**
   * Generates a Remove Favorite Action
   */
  RemoveFavorite (movieId) {
    return {
      type: types.REMOVE_FAVORITE,
      movieId
    }
  }
}

/**
 * Returns the selectors to access the Favorites part of the state.
 */
export const selectors = {
  GetFavorites: state => state.Favorites
}
