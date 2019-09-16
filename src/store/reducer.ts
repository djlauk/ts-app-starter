import { combineReducers } from 'redux'
import users, { UserState } from './users/reducer'
import route, { RoutingState } from './routing/reducer'

export interface RootState {
  users: UserState
  route: RoutingState
}

export const rootReducer = combineReducers({
  users,
  route,
})
