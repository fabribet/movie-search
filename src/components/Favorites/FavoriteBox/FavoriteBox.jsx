import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import Truncate from 'react-truncate'

import moviePoster from './imgs/movie-poster.png'

/**
 * FavoriteBox - React component.
 * Renders a small movie box .
 *
 * Properties
 * - imgUrl {String}       - The base url to get movie posters. {Required}
 * - removeFavorite {func} - Allows to remove this favorite movie from the list. {Required}
 * - movie {Object}        - The movie information
 *    - id
 *    - title
 *    - poster_path
 */
export default class FavoriteBox extends React.Component {
  constructor (props) {
    super(props)
    this.onFavoriteClick = this.onFavoriteClick.bind(this)
    this.onMovieClick = this.onMovieClick.bind(this)
  }

  static get propTypes () {
    return {
      imgUrl: PropTypes.string,
      removeFavorite: PropTypes.func.isRequired,
      movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired
      }).isRequired
    }
  }

  /**
   * Handles the remove button. Calls the removing method.
   * @param {window.Event} e
   */
  onFavoriteClick (e) {
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
    this.props.removeFavorite(this.props.movie.id)
  }

  /**
   * Handles the box click. Opens a new window with searching for the movie trailer on YouTube.
   * @param {window.Event} e
   */
  onMovieClick (e) {
    const windowFeatures = 'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=400,width=400'
    window.open(
      `https://www.youtube.com/results?search_query=${this.props.movie.title}+movie+trailer`,
      `${this.props.movie.title} trailer`,
      windowFeatures
    )
  }

  render () {
    const { movie, imgUrl } = this.props
    return (
      <div className={styles.box} onClick={this.onMovieClick}>
        <div
          className={styles.img}
          style={{
            backgroundImage: imgUrl && movie.poster_path
              ? `url(${imgUrl}w154${movie.poster_path})`
              : `url(${moviePoster})`
          }}
        />
        <div className={styles.movieInfo}>
          <div className={styles.titleWrapper}>
            <h4 className={styles.title}>
              <Truncate lines={2} ellipsis="...">
                {movie.title}
              </Truncate>
            </h4>
            <div id={'fb-removebtn'} className={styles.removeBtn} title={'Remove favorite'} onClick={this.onFavoriteClick}/>
          </div>
        </div>
      </div>
    )
  }
}
