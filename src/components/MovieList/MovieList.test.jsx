import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import MovieList from './MovieList'
import { mockCanvas, createMockStore, FAVORITES_DATA } from './../../testUtils'
import { EMPTY_MOVIE_LIST_TXT } from '../../utils/constants'

mockCanvas()
const store = createMockStore()
const TITLE = 'PAGE_TITLE'
const MOVIES = [
  {
    id: FAVORITES_DATA[1].id,
    title: FAVORITES_DATA[1].title,
    vote_average: 5,
    vote_count: 83,
    overview: 'An overview',
    poster_path: FAVORITES_DATA[1].poster_path
  },
  {
    id: 3,
    title: 'Third Title',
    vote_average: 4,
    vote_count: 811,
    overview: 'An overview of the third',
    poster_path: '/mythirdpath.jpg'
  },
  {
    id: 4,
    title: 'Fourth Title',
    vote_average: 7,
    vote_count: 111,
    overview: 'An overview of the fourth',
    poster_path: '/myfourthpath.jpg'
  }
]

const movieList =
  <Provider store={store}>
    <MovieList favorites={FAVORITES_DATA} title={TITLE} movies={MOVIES} />
  </Provider>

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    movieList,
    div
  )
})

it('Renders MovieList correctly', () => {
  const tree = renderer
    .create(movieList)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Renders a "no movies found" message when nothing was found', () => {
  const { queryByText } = render(
    <Provider store={store}>
      <MovieList favorites={{}} title={TITLE} movies={[]} />
    </Provider>
  )

  expect(queryByText(EMPTY_MOVIE_LIST_TXT)).not.toBeNull()
})

it('Renders the list and no text is displayed', () => {
  const { queryByText } = render(
    <Provider store={store}>
      <MovieList favorites={FAVORITES_DATA} title={TITLE} movies={MOVIES} />
    </Provider>
  )

  expect(queryByText(EMPTY_MOVIE_LIST_TXT)).toBeNull()
})
