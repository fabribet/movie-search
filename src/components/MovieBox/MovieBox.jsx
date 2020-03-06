import React from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'

import styles from './styles.module.scss'
import moviePoster from './imgs/movie-poster.png'

/**
 * MovieBox - React component.
 * Renders a box with a movie information and image.
 *
 * Properties
 * - imgUrl {String} - The base url to get movie posters. {Required}
 * - movie {Object} - The movie information
 *    - title
 *    - overview
 *    - vote_average
 *    - poster_path
 */
export default class MovieBox extends React.Component {
  constructor (props) {
    super(props)
    this.onFavoriteClick = this.onFavoriteClick.bind(this)
    this.onMovieClick = this.onMovieClick.bind(this)
  }

  static get propTypes () {
    return {
      imgUrl: PropTypes.string,
      addFavorite: PropTypes.func.isRequired,
      removeFavorite: PropTypes.func.isRequired,
      favorite: PropTypes.bool,
      movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number,
        vote_count: PropTypes.number,
        overview: PropTypes.string,
        poster_path: PropTypes.string.isRequired
      }).isRequired
    }
  }

  /**
   * Handles the click to remove/add a favorite. Prevents the event to bubble/propagate.
   * @param {window.Event} e - the click event.
   */
  onFavoriteClick (e) {
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
    if (this.props.favorite) this.props.removeFavorite(this.props.movie.id)
    else this.props.addFavorite(this.props.movie)
  }

  /**
   * Handles the box click. Opens a new window with searching for the movie trailer on YouTube.
   * @param {window.Event} e - the click event.
   */
  onMovieClick (e) {
    // const windowFeatures = 'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=400,width=400'
    window.open(
      `https://www.youtube.com/results?search_query=${this.props.movie.title}+movie+trailer`,
      `${this.props.movie.title} trailer`,
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=700,
      height=700`
      // windowFeatures
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
              ? `url(${this.props.imgUrl}w154${movie.poster_path})`
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
            <div
              id="favoriteBtn"
              className={`${styles.favorite} ${this.props.favorite ? styles.solid : styles.empty}`}
              onClick={this.onFavoriteClick}
              title={this.props.favorite ? 'Remove favorite' : 'Add favorite'}
            />
          </div>
          <div className={styles.ratingWrapper}>
            Rating:
            {movie.vote_average
              ? (
                <span>
                  <span
                    className={`${styles.rating} ${movie.vote_average < 5
                      ? styles.lowRating : movie.vote_average < 7
                      ? styles.normalRating : styles.goodRating}`}
                  >
                    {movie.vote_average}
                  </span>
                  Votes:
                  <span className={styles.voteCount}>{movie.vote_count}</span>
                </span>
              ) : <span className={styles.voteCount}>n/a</span>
            }
          </div>
          <div className={styles.overview}>
            <Truncate lines={6} ellipsis="...">
              {movie.overview}
            </Truncate>
          </div>
        </div>
      </div>
    )
  }
}
