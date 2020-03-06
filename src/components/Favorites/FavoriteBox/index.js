import { connect } from 'react-redux'
import { actions } from '../../../actions/Favorites'
import FavoriteBox from './FavoriteBox'

const mapStateToProps = state => ({
  // If the API configuration data has been obtained the Images base url is passed.
  imgUrl: state.TMDB.apiConfig.data ? state.TMDB.apiConfig.data.images.base_url : null
})

const mapDispatchToProps = dispatch => ({
  removeFavorite (movieId) {
    dispatch(actions.RemoveFavorite(movieId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBox)
