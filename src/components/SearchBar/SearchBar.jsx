import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const THROTTLING_TIME = process.env.REACT_APP_THROTTLING_TIME_MS

/**
 * SearchBar - React component.
 * Renders a bar with a search input.
 *
 * Properties
 * - handleSearch {func} - The handler for the search action. {Required}
 * - clearSearch {func}  - Handler for the search input clearence. 
 */
export default class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.throttling = null

    this.search = this.search.bind(this)
  }
  
  static get propTypes() {
    return {
      search: PropTypes.func.isRequired,
      clearSearch: PropTypes.func.isRequired
    }
  }

  /**
   * Validates that the query is not empty and calls the handler.
   */
  search() {
    if (this.state.query) {
      this.props.search(this.state.query)
    } else this.props.clearSearch()
  }

  /**
   * Creates a timeout to trigger the search based on the configured throttling time to avoid innecesary
   * calls to the API.
   */
  throttle() {
    const self = this
    if (this.throttling) clearInterval(this.throttling)
    this.throttling = setTimeout (() => {
      self.search()
    }, THROTTLING_TIME)
  }
  
  render() {
    return (
      <div className={styles.searchBar}>
        <form className={styles.inputContainer} >
          <div className={styles.searchIconContainer}>
            <i className="material-icons"></i>
          </div>
          <input
            value={this.state.query}
            onChange={event => {
              this.setState({ query: event.target.value }, () => {
                this.throttle()
              })

            }}
            onKeyDown={event => {
              switch (event.key) {
                case 'Escape':
                  this.setState({ query: '' }, () => {
                    this.throttle()
                  })
                  break;
                default:
                    break
              }
            }}
            className={styles.searchBox}
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
    )
  }
}