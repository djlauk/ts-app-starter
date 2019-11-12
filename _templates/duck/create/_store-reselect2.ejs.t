---
to: src/store/reselect.ts
inject: true
skip_if: "registerSelectors\\(<%= duckSelectors %>"
after: "// HYGEN.IO: INJECT SELECTORS HERE"
---
  ReselectTools.registerSelectors(<%= duckSelectors %>)