import createSagaMiddleware from 'redux-saga'
import { all, spawn, call } from 'redux-saga/effects'

import users from './users/sagas'
import route from './routing/sagas'

export const rootSagas = {
  users,
  route,
}

export const sagaMiddleware = createSagaMiddleware()

export async function startSagas() {
  for (let name in rootSagas) {
    console.log('root saga', name)
    const sagas = rootSagas[name]

    function* saga() {
      yield all(
        sagas.map(saga =>
          spawn(function*() {
            while (true) {
              try {
                yield call(saga)
                break
              } catch (err) {
                console.error(err)
              }
            }
          })
        )
      )
    }

    sagaMiddleware.run(saga)
  }
}
