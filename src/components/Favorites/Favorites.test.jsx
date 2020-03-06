import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import Favorites from './Favorites'
import { EMPTY_FAVORITES_TXT } from '../../utils/constants'
import { mockCanvas, createMockStore, FAVORITES_DATA } from './../../testUtils'

mockCanvas()
const store = createMockStore()

const favorites =
  <Provider store={store}>
    <Favorites favorites={FAVORITES_DATA} />
  </Provider>

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    favorites,
    div
  )
})

it('Renders favorites correctly', () => {
  const tree = renderer
    .create(favorites)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Renders an empty list message when no favorites have been added', () => {
  const { queryByText } = render(
    <Provider store={store}>
      <Favorites favorites={{}} />
    </Provider>
  )

  expect(queryByText(EMPTY_FAVORITES_TXT)).not.toBeNull()
})

it('Renders the list and no text is displayed', () => {
  const { queryByText } = render(favorites)

  expect(queryByText(EMPTY_FAVORITES_TXT)).toBeNull()
})
