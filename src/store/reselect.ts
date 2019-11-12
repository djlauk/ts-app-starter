import { Store } from 'redux'
import * as ReselectTools from 'reselect-tools'

// HYGEN.IO: INJECT IMPORT HERE
import { UserSelectors } from './users'
import { RoutingSelectors } from './routing'

export const startReselect = (store: Store) => {
  ReselectTools.getStateWith(() => store.getState())
  // HYGEN.IO: INJECT SELECTORS HERE
  ReselectTools.registerSelectors(UserSelectors)
  ReselectTools.registerSelectors(RoutingSelectors)
}
