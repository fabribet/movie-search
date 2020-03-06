import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SearchBar from './SearchBar'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <SearchBar search={() => {}} clearSearch={() => {}} />,
    div
  )
})

it('Renders favorite box correctly', () => {
  const tree = renderer
    .create(<SearchBar search={() => {}} clearSearch={() => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Search input behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('Waits 0.3 seconds before triggering search', () => {
    // Render a checkbox with label in the document
    const shallowSB = shallow(<SearchBar search={() => {}} clearSearch={() => {}} />)
    const input = shallowSB.find('input#search-bar')
    input.simulate('change', { target: { value: 'asd' } })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), '300')
  })

  it('Search function is called when input has changed', () => {
    const VALUE = 'Search function'
    const searchSpy = jest.fn()

    // Render a SearchBar
    const shallowSB = shallow(<SearchBar search={searchSpy} clearSearch={() => {}} />)

    const input = shallowSB.find('input#search-bar')
    input.simulate('change', { target: { value: VALUE } })
    jest.runAllTimers()

    expect(searchSpy).toHaveBeenCalled()
    expect(searchSpy).toHaveBeenLastCalledWith(VALUE)
    expect(searchSpy).toHaveBeenCalledTimes(1)
  })

  it('Clear function is called when input has been cleared', () => {
    const VALUE = 'clear function'
    const searchSpy = jest.fn()
    const clearSearchSpy = jest.fn()
    // Render a SearchBar
    const shallowSB = shallow(<SearchBar search={searchSpy} clearSearch={clearSearchSpy} />)
    const input = shallowSB.find('input#search-bar')

    input.simulate('change', { target: { value: VALUE } })
    jest.runAllTimers()

    input.simulate('change', { target: { value: '' } })
    jest.runAllTimers()
    expect(clearSearchSpy).toHaveBeenCalled()
    expect(clearSearchSpy).toHaveBeenCalledTimes(1)
  })
})
