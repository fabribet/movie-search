import { connect } from 'react-redux'
import { actions } from '../../actions/TMDB'
import SearchBar from './SearchBar'

const mapDispatchToProps = dispatch => ({
  /**
   * Dispatches the SearchMovie action.
   * @param {string} query - The search query string.
   */
  search (query) {
    dispatch(actions.SearchMovies(query))
  },
  /**
   * Dispatches the ClearSearch action.
   */
  clearSearch () {
    dispatch(actions.ClearSearch())
  }
})

export default connect(null, mapDispatchToProps)(SearchBar)
