import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import heartImg from './imgs/heart-solid.svg'
import { EMPTY_FAVORITES_TXT } from '../../utils/constants'
import FavoriteBox from './FavoriteBox'

/**
 * Favorites - React component.
 * Renders a list of favorited movies.
 *
 * Properties
 * - favorites {Object} - The list of favorites (as an object).
 */
function Favorites (props) {
  // Favorites are stored as a key<movieId => value<movieObject> pair in an object.
  const favoritesKeys = Object.keys(props.favorites)
  return (
    <div className={styles.favorites}>
      <h5 className={styles.title}>Favorite Movies <img className={styles.favoriteImg} src={heartImg} alt={'favorite'}/></h5>
      <div className={`${styles.container} ${!favoritesKeys || !favoritesKeys.length ? styles.empty : ''}`}>
        {favoritesKeys && favoritesKeys.length
          ? favoritesKeys.map((key) => <FavoriteBox key={key} movie={props.favorites[key]} />)
          : EMPTY_FAVORITES_TXT
        }
      </div>
    </div>
  )
}

Favorites.propTypes = {
  favorites: PropTypes.shape({}).isRequired
}

export default Favorites
