---
to: src/ui/index.ts
inject: true
skip_if: <%= tag %>
after: "// HYGEN.IO: INJECT VIEW HERE"
---
import './<%= tag %>'