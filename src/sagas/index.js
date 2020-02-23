import { fork, all } from 'redux-saga/effects'
import TMDB from './TMDB'

export default function*() {
  yield all([fork(TMDB)])
}
