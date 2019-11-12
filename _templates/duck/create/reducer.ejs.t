---
to: src/store/<%= duck %>/reducer.ts
---
<%
  duckActions
-%>
import { <%= duckActions %>, <%= duckTypes %> } from './actions'
import { <%= duckModel %> } from './model'

export interface <%= duckState %> {
  entities: { [id: number]: <%= duckModel %> }
  ids: number[]
  fetching: boolean
  selected: number
  error: Error
}

const initialState: <%= duckState %> = {
  entities: {},
  ids: [],
  fetching: false,
  selected: 0,
  error: null,
}

export default (
  state: <%= duckState %> = initialState,
  action: <%= duckActions %>
): <%= duckState %> => {
  switch (action.type) {
    case <%= duckTypes %>.<%= duckUpcase %>_SELECT:
      return { ...state, selected: action.payload.id }

    case <%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_REQUEST:
      return { ...state, fetching: true, error: null }

    case <%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        entities: {
          ...state.entities,
          ...action.payload.<%= duck %>.reduce((map, <%= duckSingular %>) => {
            map[<%= duckSingular %>.id] = <%= duckSingular %>
            return map
          }, {}),
        },
        ids: action.payload.<%= duck %>.map(<%= duckSingular %> => <%= duckSingular %>.id),
      }

    case <%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.payload.error }

    case <%= duckTypes %>.<%= duckUpcase %>_FETCH_REQUEST:
      return { ...state, fetching: true, error: null }

    case <%= duckTypes %>.<%= duckUpcase %>_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        entities: {
          ...state.entities,
          [action.payload.<%= duckSingular %>.id]: action.payload.<%= duckSingular %>,
        },
      }

    case <%= duckTypes %>.<%= duckUpcase %>_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.payload.error }

    default:
      return state
  }
}
