import { routerReducer } from 'redux-first-routing'

export interface RoutingState {
  pathname: string
  search: string
  queries: any
  hash: string
}

export default routerReducer
