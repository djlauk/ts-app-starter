---
to: src/store/reselect.ts
inject: true
skip_if: import { <%= duckSelectors %> }
after: "// HYGEN.IO: INJECT IMPORT HERE"
---
import { <%= duckSelectors %> } from './<%= duck %>'