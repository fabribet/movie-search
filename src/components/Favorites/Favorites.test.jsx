import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Favorites from './Favorites';

const favoritesExample = {
    1: {
        id: 1,
        title: 'Movie 1'
    },

    2: {
        id: 2,
        title: 'Movie 2'
    }
}

const SpiedRemoveFavorite = jest.fn();
const favorites = <Favorites  favorites={favoritesExample} />

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    favorites,
    div
  );
});

it('Renders favorites correctly', () => {
  const tree = renderer
    .create(favorites)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
