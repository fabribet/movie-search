export const types = {
  SEARCH_MOVIES: 'SEARCH_MOVIES',
  SEARCH_MOVIES_RESOLVED: 'SEARCH_MOVIES_RESOLVED',
  SEARCH_MOVIES_REJECTED: 'SEARCH_MOVIES_REJECTED',

  CLEAR_SEARCH: 'CLEAR_SEARCH',

  GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
  GET_POPULAR_MOVIES_RESOLVED: 'GET_POPULAR_MOVIES_RESOLVED',
  GET_POPULAR_MOVIES_REJECTED: 'GET_POPULAR_MOVIES_REJECTED',

  GET_CONFIG: 'GET_CONFIG',
  GET_CONFIG_RESOLVED: 'GET_CONFIG_RESOLVED',
  GET_CONFIG_REJECTED: 'GET_CONFIG_REJECTED'
}

export const actions = {
  /**
   * Returns the Get Popular Movies Action
   */
  GetPopularMovies () {
    return { type: types.GET_POPULAR_MOVIES }
  },

  /**
   *  Returns the Get Popular Movies Resolved Action
   * @param {object} response - Fetch API response
   * @param {object} payload - Fetch API Payload encoded as JSON
   */
  GetPopularMoviesResolved (response, payload) {
    return {
      type: types.GET_POPULAR_MOVIES_RESOLVED,
      response,
      payload
    }
  },

  /**
   * Returns the Get Popular Movies Rejected Action
   * @param {object} error - Fetch API response
   */
  GetPopularMoviesRejected (error) {
    return {
      type: types.GET_POPULAR_MOVIES_REJECTED,
      error
    }
  },

  /**
   * Generates a SearchMovies Action
   * @param {string} query - The query string to search Movies
   */
  SearchMovies (query) {
    return {
      type: types.SEARCH_MOVIES,
      query
    }
  },

  /**
   * Generates a SearchMovies Resolved Action
   * @param {object} response - Fetch API response
   * @param {object} payload - Fetch API Payload encoded as JSON
   */
  SearchMoviesResolved (response, payload) {
    return {
      type: types.SEARCH_MOVIES_RESOLVED,
      response,
      payload
    }
  },

  /**
   * Generates a SearchMovies Rejected Action
   * @param {object} error - Fetch API response
   */
  SearchMoviesRejected (error) {
    return {
      type: types.SEARCH_MOVIES_REJECTED,
      error
    }
  },

  /**
   * Returns the Clear Search action.
   */
  ClearSearch () {
    return { type: types.CLEAR_SEARCH }
  },

  /**
   * Generates a Get Config Action
   */
  GetConfig () {
    return { type: types.GET_CONFIG }
  },

  /**
   * Generates a Get Config Resolved Action
   * @param {object} response - Fetch API response
   * @param {object} payload - Fetch API Payload encoded as JSON
   */
  GetConfigResolved (response, payload) {
    return {
      type: types.GET_CONFIG_RESOLVED,
      response,
      payload
    }
  },

  /**
   * Generates a Get Config Rejected Action
   * @param {object} error - Fetch API response
   */
  GetConfigRejected (error) {
    return {
      type: types.GET_CONFIG_REJECTED,
      error
    }
  }
}
