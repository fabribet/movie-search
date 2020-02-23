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
function FavoriteBox(props) {

  /**
   * Handles the remove button. Calls the removing method.
   * @param {window.Event} e 
   */
  const onFavoriteClick = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    props.removeFavorite(props.movie.id)
  }

  /**
   * Handles the box click. Opens a new window with searching for the movie trailer on YouTube.
   * @param {window.Event} e 
   */
  const onMovieClick = (e) => {
    const windowFeatures = 'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=400,width=400'
    window.open(
      `https://www.youtube.com/results?search_query=${props.movie.title}+movie+trailer`,
      `${props.movie.title} trailer`,
      windowFeatures
    )
  }

  return (
    <div className={styles.box} onClick={onMovieClick}>
      <div className={styles.img}  style={{
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
          <div id={'fb-removebtn'} className={styles.removeBtn} title={'Remove favorite'} onClick={onFavoriteClick}/>
        </div>
      </div>
    </div>
  )
}

FavoriteBox.propTypes = {
    imgUrl: PropTypes.string,
    removeFavorite: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired
    }).isRequired
}

export default FavoriteBox