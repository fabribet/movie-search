import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import MovieBox from '../MovieBox'

/**
 * MovieList - React component.
 * Renders a lists of movies.
 *
 * Properties
 * - imgUrl {String} - The base url to get movie posters. {Required}
 * - movie {Object} - The movie information
 *    - title
 *    - overview
 *    - vote_average
 *    - poster_path
 */
function MovieList(props) {
  return (
    <div className={styles.movieList}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div className={styles.moviesContainer}>
          {props.movies && props.movies.length
            ? props.movies.map((movie, index) => <MovieBox key={index} movie={movie} favorite={!!(props.favorites[movie.id])}/>)
            : 'There are no movies that match the criteria, try again.'
          }
        </div>
      </div>
    </div>
  )
}

MovieList.propTypes = {
    favorites: PropTypes.object,
    title: PropTypes.string,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number,
        overview: PropTypes.string,
        poster_path: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
}

export default MovieList