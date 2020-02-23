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
function MovieBox(props) {

  /**
   * Handles the click to remove/add a favorite. Prevents the event to bubble/propagate.
   * @param {window.Event} e - the click event.
   */
  const onFavoriteClick = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (props.favorite) props.removeFavorite(props.movie.id)
    else props.addFavorite(props.movie)

  }

  /**
   * Handles the box click. Opens a new window with searching for the movie trailer on YouTube.
   * @param {window.Event} e - the click event.
   */
  const onMovieClick = (e) => {
    // const windowFeatures = 'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=400,width=400'
    window.open(
      `https://www.youtube.com/results?search_query=${props.movie.title}+movie+trailer`,
      `${props.movie.title} trailer`,
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

  return (
    <div className={styles.box} onClick={onMovieClick}>
      <div className={styles.img} style={{
        backgroundImage: props.imgUrl && props.movie.poster_path 
          ? `url(${props.imgUrl}w154${props.movie.poster_path})`
          : `url(${moviePoster})`
        }}
      />
      <div className={styles.movieInfo}>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>
            <Truncate lines={2} ellipsis="...">
              {props.movie.title}
            </Truncate>
          </h4>
          <div
            className={`${styles.favorite} ${props.favorite ? styles.solid : styles.empty}`}
            onClick={onFavoriteClick}
            title={props.favorite ? 'Remove favorite' : 'Add favorite'}
          />
        </div>
        <div className={styles.ratingWrapper}>
          Rating:
          {props.movie.vote_average 
            ? (<span>
                  <span 
                    className={`${styles.rating} ${props.movie.vote_average < 5
                      ? styles.lowRating : props.movie.vote_average < 7
                      ? styles.normalRating : styles.goodRating}`}
                  >
                    {props.movie.vote_average}
                  </span>
                  Votes:
                  <span className={styles.voteCount}>{props.movie.vote_count}</span>
                </span>
            ) : <span className={styles.voteCount}>n/a</span>
          }
        </div>
        <div className={styles.overview}>
          <Truncate lines={6} ellipsis="...">
          {props.movie.overview}
          </Truncate>
        </div>
      </div>
    </div>
  )

}

MovieBox.propTypes = {
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

export default MovieBox