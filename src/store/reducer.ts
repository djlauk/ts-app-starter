import { combineReducers } from 'redux'

// HYGEN.IO: INJECT IMPORT HERE
import users, { UserState } from './users/reducer'
import route, { RoutingState } from './routing/reducer'

export interface RootState {
  // HYGEN.IO: INJECT STATE HERE
  users: UserState
  route: RoutingState
}

export const rootReducer = combineReducers({
  // HYGEN.IO: INJECT REDUCER HERE
  users,
  route,
})
