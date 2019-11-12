---
to: src/store/<%= duck %>/selectors.ts
---
import { createSelector } from 'reselect'

import { RootState } from '../reducer'

const getState = (state: RootState) => state.<%= duck %>

export const selected = createSelector(
  [getState],
  state => state.selected
)

export const entities = createSelector(
  [getState],
  state => state.entities
)

export const <%= duck %> = createSelector(
  [getState],
  state => state.ids.map(id => state.entities[id]).sort((a, b) => a.id - b.id)
)

export const selected<%= duckModel %> = createSelector(
  [selected, entities],
  (selected, entities) => entities[selected]
)

export const shouldFetch = createSelector(
  [<%= duck %>],
  <%= duck %> => <%= duck %> === undefined // && state.fetching === false
)
