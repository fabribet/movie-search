import React from 'react'
import PropTypes from 'prop-types'

import style from './styles.scss'

import SearchBar from '../../components/SearchBar'
import MovieList from '../../components/MovieList'
import Favorites from '../../components/Favorites'

const LOADING_STR = 'Loading...'

// Api state data type skel
const dataType = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object)
  })
})

/**
 * Home PAge - React Component.
 * Main MovieSearch page, Favorites section, the search bar and the search results/ popular movies are rendered.
 *
 * Props
 * favorites {object}      - The saved movies.
 * apiConfig {object}      - Api config information
 * popularMovies {object}  - Popular movies gotten from the API
 * searchedMovies {object} - Movie Search results
 * getApiConfig {func}     - Triggers the call for getting the API config
 * getPopularMovies {func} - Triggers the call for getting the Popular movies
 *
 */
export default class HomePage extends React.Component {
  constructor (props) {
    super(props)
    props.getApiConfig()
    props.getPopularMovies()
  }

  static get propTypes () {
    return {
      favorites: PropTypes.object,
      apiConfig: dataType,
      popularMovies: dataType,
      getPopularMovies: PropTypes.func.isRequired,
      getApiConfig: PropTypes.func.isRequired,
      searchedMovies: dataType
    }
  }

  /**
   * Checks if a search has been started/done
   */
  noSearch () { return !this.props.searchedMovies.loading && !this.props.searchedMovies.error && !this.props.searchedMovies.data }

  /**
   * Returns the movie list based on the current app state [Searching movies / Idle (Popular Movies)]
   */
  getMovieList () {
    let movies
    let title
    if (this.noSearch()) {
      if (this.props.popularMovies.loading) return LOADING_STR
      else if (this.props.popularMovies.error) return this.props.popularMovies.error
      movies = this.props.popularMovies.data.results.slice(0, process.env.REACT_APP_POPULAR_SIZE)
      title = 'Popular Movies'
    } else {
      if (this.props.searchedMovies.loading) return LOADING_STR
      else if (this.props.searchedMovies.error) return this.props.searchedMovies.error
      movies = this.props.searchedMovies.data.results.slice(0, process.env.REACT_APP_SEARCH_SIZE)
      title = 'Search Results'
    }
    return <MovieList movies={movies} favorites={this.props.favorites} title={title} />
  }

  render () {
    return (
      <div className={style.container}>
        <Favorites />
        <SearchBar />
        {this.getMovieList()}
      </div>
    )
  }
}
