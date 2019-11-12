---
to: src/store/index.ts
inject: true
skip_if: <%= duck %>
after: "// HYGEN.IO: INJECT DUCK HERE"
---
export * from './<%= duck %>'