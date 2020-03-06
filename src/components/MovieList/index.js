import { connect } from 'react-redux'
import MovieList from './MovieList'

const mapStateToProps = state => ({
  favorites: state.Favorites.favorites
})

export default connect(mapStateToProps)(MovieList)
