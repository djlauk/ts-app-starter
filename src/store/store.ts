import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { middleware } from './middleware'
import { rootReducer } from './reducer'
import { startRouting } from './routing/middleware'
import { startReselect } from './reselect'
import { startSagas } from './sagas'
import { initialState } from './storage'

const composeEnhancers = composeWithDevTools({ actionsBlacklist: [] })
const enhancer = composeEnhancers(applyMiddleware(...middleware))

export const store = createStore(rootReducer, initialState(), enhancer)

startSagas().then(() => {
  startReselect(store)
  startRouting(store)
})
