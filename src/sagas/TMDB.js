import { searchMovies, getPopularMovies } from '../api/movies'
import { getConfig } from '../api/config'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../actions/TMDB'

/**
 * Handles PopularMovie call
 */
function* getPopularMoviesHandler() {
  try {
    const res = yield call(getPopularMovies)
    // Check if res.status ~ 200
    if (res.ok) {

      yield put(actions.GetPopularMoviesResolved(res, yield res.json()))
    } else throw res
  } catch (e) {
    console.log(e, 'There was an error loading the popular movies')  
    yield put(actions.GetPopularMoviesRejected('There was an error loading the popular movies'))
  }
}

/**
 * Handles the Movie search call intent
 * @param {string} query - The search criteria.
 */
function* movieSearchHandler({ query }) {
  try {
    const res = yield call(searchMovies, query)
    // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.SearchMoviesResolved(res, yield res.json()))
    } else throw res
  } catch (e) {

    console.log(e)
    
    yield put(actions.SearchMoviesRejected('There was an error searching for movies'))
  }
}

/**
 * Handles the API configuration information call
 */
function* getConfigHandler() {
  try {
    const res = yield call(getConfig)
    // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.GetConfigResolved(res, yield res.json()))
    } else throw res
  } catch (e) {

    console.log(e)
    
    yield put(actions.GetConfigRejected('There was an error obtaining the API configuration'))
  }
}

export default function*() {
  yield takeLatest(types.SEARCH_MOVIES, movieSearchHandler)
  yield takeLatest(types.GET_POPULAR_MOVIES, getPopularMoviesHandler)
  yield takeLatest(types.GET_CONFIG, getConfigHandler)
}
