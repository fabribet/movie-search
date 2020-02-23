import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import { render } from '@testing-library/react';
import FavoriteBox from './FavoriteBox';

const SpiedRemoveFavorite = jest.fn();
const favoriteBox = <FavoriteBox removeFavorite={SpiedRemoveFavorite} movie={{ id: 1, title: 'fake movie', poster_path: '/bla.png'}} />

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    favoriteBox,
    div
  );
});

it('Renders favorite box correctly', () => {
  const tree = renderer
    .create(favoriteBox)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


xit('Remove Favorite is called when the remove btn is clicked', () => {
  // Render a checkbox with label in the document
  const shallowFB = shallow(favoriteBox);
  const closeBtn = shallowFB.find('div#fb-removebtn');
  closeBtn.simulate('click');

  expect(SpiedRemoveFavorite).toHaveBeenCalled();
});
