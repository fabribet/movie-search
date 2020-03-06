import { types } from '../actions/Favorites'

/**
 * Favorites Middleware. In charge of saving the favorites information to the local storage.
 */
export default class FavoritesStorage {
  constructor (key) {
    this.key = key
  }

  /**
   * Returns the initial state for the Favorites section, initialized by the local storage if
   * something has been saved
   */
  InitialState () {
    const state = localStorage.getItem(this.key)
    if (state) {
      try {
        const parsedState = JSON.parse(state)
        return {
          Favorites: parsedState
        }
      } catch (e) {
        return { Favorites: { favorites: {} } }
      }
    } else return { Favorites: { favorites: {} } }
  }

  /**
   * Favorites Middleware. Checks for the pertinent actions to save the Favorites updates.
   */
  Middleware () {
    return store => next => action => {
      if (action.type === types.ADD_FAVORITE || action.type === types.REMOVE_FAVORITE) {
        const result = next(action)
        localStorage.setItem(this.key, JSON.stringify(store.getState().Favorites))
        return result
      }
      return next(action)
    }
  }
}
