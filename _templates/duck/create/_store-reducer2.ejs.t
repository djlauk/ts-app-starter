---
to: src/store/reducer.ts
inject: true
skip_if: "<%= duck %>: <%= duckState %>"
after: "// HYGEN.IO: INJECT STATE HERE"
---
  <%= duck %>: <%= duckState %>