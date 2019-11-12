---
to: src/store/<%= duck %>/index.ts
---
import * as <%= duckSelectors %> from './selectors'

export * from './actions'
export * from './model'
export { <%= duckSelectors %> }
