---
to: src/store/sagas.ts
inject: true
skip_if: import <%= duck %>
after: "// HYGEN.IO: INJECT IMPORT HERE"
---
import <%= duck %> from './<%= duck %>/sagas'