---
to: src/store/<%= duck %>/actions.ts
---
import { createAction, ActionsUnion } from '../actions'
import { <%= duckModel %> } from './model'

export enum <%= duckTypes %> {
  <%= duckUpcase %>_SELECT = '<%= duckUpcase %>_SELECT',

  <%= duckUpcase %>_LIST_FETCH = '<%= duckUpcase %>_LIST_FETCH',
  <%= duckUpcase %>_LIST_FETCH_REQUEST = '<%= duckUpcase %>_LIST_FETCH_REQUEST',
  <%= duckUpcase %>_LIST_FETCH_SUCCESS = '<%= duckUpcase %>_LIST_FETCH_SUCCESS',
  <%= duckUpcase %>_LIST_FETCH_FAILURE = '<%= duckUpcase %>_LIST_FETCH_FAILURE',

  <%= duckUpcase %>_FETCH = '<%= duckUpcase %>_FETCH',
  <%= duckUpcase %>_FETCH_REQUEST = '<%= duckUpcase %>_FETCH_REQUEST',
  <%= duckUpcase %>_FETCH_SUCCESS = '<%= duckUpcase %>_FETCH_SUCCESS',
  <%= duckUpcase %>_FETCH_FAILURE = '<%= duckUpcase %>_FETCH_FAILURE',
}

export const <%= duckActions %> = {
  select<%= duckModel %>: (id: number) => createAction(<%= duckTypes %>.<%= duckUpcase %>_SELECT, { id }),

  fetch<%= duckModel %>List: () => createAction(<%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH),
  fetch<%= duckModel %>ListRequest: () => createAction(<%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_REQUEST),
  fetch<%= duckModel %>ListSuccess: (<%= duck %>: <%= duckModel %>[]) =>
    createAction(<%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_SUCCESS, { <%= duck %> }),
  fetch<%= duckModel %>ListFailure: (error: Error) =>
    createAction(<%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH_FAILURE, { error }),

  fetch<%= duckModel %>: (id: number) => createAction(<%= duckTypes %>.<%= duckUpcase %>_FETCH, { id }),
  fetch<%= duckModel %>Request: (id: number) =>
    createAction(<%= duckTypes %>.<%= duckUpcase %>_FETCH_REQUEST, { id }),
  fetch<%= duckModel %>Success: (<%= duckSingular %>: <%= duckModel %>) =>
    createAction(<%= duckTypes %>.<%= duckUpcase %>_FETCH_SUCCESS, { <%= duckSingular %> }),
  fetch<%= duckModel %>Failure: (id: number, error: Error) =>
    createAction(<%= duckTypes %>.<%= duckUpcase %>_FETCH_FAILURE, {
      id,
      error,
      name: error.name,
      message: error.message,
      stack: error.stack,
    }),
}

export type <%= duckActions %> = ActionsUnion<typeof <%= duckActions %>>
