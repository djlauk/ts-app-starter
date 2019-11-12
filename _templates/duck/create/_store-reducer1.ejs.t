---
to: src/store/reducer.ts
inject: true
skip_if: "import <%= duck %>"
after: "// HYGEN.IO: INJECT IMPORT HERE"
---
import <%= duck %>, { <%= duckState %> } from './<%= duck %>/reducer'