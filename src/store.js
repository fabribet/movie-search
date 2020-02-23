import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Saga from './sagas'
import reducers from './reducers'
import FavoritesStorage from './middlewares/FavoritesStorage'

const composeEnhanced =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true})
    : compose
    
const FavoritesStorageMiddleware = new FavoritesStorage('__FAVORITES__')

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    FavoritesStorageMiddleware.InitialState(),
    composeEnhanced(
      applyMiddleware(
        sagaMiddleware,
        FavoritesStorageMiddleware.Middleware()
      )
    )
  )
  sagaMiddleware.run(Saga)
  return store
}
