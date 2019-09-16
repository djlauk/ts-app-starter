import { Store } from 'redux'
import * as ReselectTools from 'reselect-tools'

import { UserSelectors } from './users'
import { RoutingSelectors } from './routing'

export const startReselect = (store: Store) => {
  ReselectTools.getStateWith(() => store.getState())
  ReselectTools.registerSelectors(UserSelectors)
  ReselectTools.registerSelectors(RoutingSelectors)
}
