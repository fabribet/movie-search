import configureStore from 'redux-mock-store'

// Mock the canvas usage for external library usage on tests.
export function mockCanvas () {
  const createElement = document.createElement.bind(document)
  document.createElement = tagName => {
    const element = createElement(tagName)
    if (tagName === 'canvas') {
      element.getContext = () => ({})
    }
    return element
  }
}

/**
 * Create Mock store for testing
 */
const mockStore = configureStore([])
export function createMockStore (initialState = {
  Favorites: {
    favorites: {}
  },
  TMDB: {
    apiConfig: {
      loading: false,
      error: null,
      data: {
        images: {
          base_url: ''
        }
      }
    }
  }
}) {
  return mockStore(initialState)
}

export const FAVORITES_DATA = {
  1: {
    id: 1,
    title: 'Movie 1',
    poster_path: '/asdasdas.jpg'
  },

  2: {
    id: 2,
    title: 'Movie 2',
    poster_path: '/asdasdas2.jpg'
  }
}
