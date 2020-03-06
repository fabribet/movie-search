import { connect } from 'react-redux'
import Favorites from './Favorites'

const mapStateToProps = state => {
  return {
    favorites: state.Favorites.favorites
  }
}

export default connect(mapStateToProps)(Favorites)
