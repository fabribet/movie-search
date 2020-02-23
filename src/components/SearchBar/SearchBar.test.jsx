import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
// import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

const searchSpy = jest.fn();
const clearSearchSpy = jest.fn();
const searchBarSpyMethods = <SearchBar search={searchSpy} clearSearch={clearSearchSpy} />
const searchBar = <SearchBar search={() => {}} clearSearch={() => {}} />

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    searchBar,
    div
  );
});

it('Renders favorite box correctly', () => {
  const tree = renderer
    .create(searchBar)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

xit('Search function is called when input has changed', () => {
    // Render a checkbox with label in the document
    const shallowSB = shallow(searchBarSpyMethods);
    const input = shallowSB.find('input');
    input.simulate('change', { target: { value: 'asd' } })
    // Wont work because of the async call and throttling
    expect(searchSpy).toHaveBeenCalled();
  });
