import { types } from '../actions/TMDB'

const INITIAL_STATE = { loading: true, error: null, data: null }

export default (state = {
  searchedMovies: { loading: false, error: null, data: null },
  popularMovies: INITIAL_STATE,
  apiConfig: INITIAL_STATE
}, action) => {
  switch (action.type) {
    case types.GET_POPULAR_MOVIES: {
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          loading: true
        }
      }
    }

    case types.GET_POPULAR_MOVIES_RESOLVED:
      return {
        ...state,
        popularMovies: {
          loading: false,
          error: null,
          data: action.payload
        }
      }

    case types.GET_POPULAR_MOVIES_REJECTED:
      return {
        ...state,
        popularMovies: {
          loading: false,
          error: action.error,
          data: null
        }
      }

    case types.SEARCH_MOVIES: {
      return {
        ...state,
        searchedMovies: {
          ...state.searchedMovies,
          loading: true
        }
      }
    }

    case types.SEARCH_MOVIES_RESOLVED:
      return {
        ...state,
        searchedMovies: {
          loading: false,
          error: null,
          data: action.payload
        }
      }

    case types.SEARCH_MOVIES_REJECTED:
      return {
        ...state,
        searchedMovies: {
          loading: false,
          error: action.error,
          data: null
        }
      }

    case types.CLEAR_SEARCH: {
      return {
        ...state,
        searchedMovies: {
          loading: false,
          error: null,
          data: null
        }
      }
    }

    case types.GET_CONFIG: {
      return {
        ...state,
        apiConfig: {
          ...state.apiConfig,
          loading: true
        }
      }
    }

    case types.GET_CONFIG_RESOLVED:
      return {
        ...state,
        apiConfig: {
          loading: false,
          error: null,
          data: action.payload
        }
      }

    case types.GET_CONFIG_REJECTED:
      return {
        ...state,
        popularMovies: {
          loading: false,
          error: action.error,
          data: null
        }
      }

    default:
      return state
  }
}
