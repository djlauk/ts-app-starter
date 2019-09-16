# ts-app-starter

This is a starter / template project for building web apps with [TypeScript][] and [lit-element][].

## Credits

I am not clever enough to have come up with this myself. The general idea, code structure and initial code were passed on to me by [Simon Green](https://github.com/CaptainCodeman/).

My work is mainly adding the more or less elaborate explanations in this README file, so I can look it up again, later.

## How to use this starter project

As a prerequisite you must install [nodejs][] -- I use the most current LTS version, which was version 10 at the time of writing.

This will install the following tools:

- `node`: The interpreter for JavaScript.
- `npm`: The node package manager, used for installing dependencies.
- `npx`: A convenience tool for executing node scripts.

How to exactly use these is beyond the scope of these instructions.

### Start a new project of this template

1.  Clone the project
2.  Delete the `./.git` folder, and create a new repo: `rm -rf ./git && git init`
3.  Change the following bits:
    - In `package.json`:
      - package name
      - package description
      - version
      - author
      - license (if you need)
      - in script `relink`: change the name of you web component project, that you want to link to (for development)
    - In `LICENSE.md`:
      - copyright year
      - copyright holder
    - In `README.md`:
      - Put information for _your_ web app project, because _this_ README is about how to use the starter template, d'oh!
    - In `public/index.html`:
      - Update the `<title>`
      - Update the configuration (URLs, API keys, etc.) in the first `<script>` tag to match the _local development environment_.<br>**NOTE:** This should be overwritten by / **generated on the server**. Check the comment in the file.
4.  Install dependencies: `npm install`
5.  (Re-)Create the link to the web components project: `npm run relink`<br>**NOTE:** This will be required after every `npm install`.

### How to start the development server

In one terminal window run the bundling, which triggers the TypeScript transpilation: `npm run build:watch`

In another terminal window run the development server: `npm start`

### How to add another component / view

**TO BE WRITTEN, YET ...**

Rough outline / general thoughts:

- Don't be put off by the number of files and folders. At first it looks scary, but good code structure will pay off in the _long run_.
- Views...
  - Views are _dumb_, i.e. limited to providing the state from redux to the components and transforming the components' events back to redux actions.
    - The components should go into "the other project" (based on [ts-wc-starter][]) and be tested there.
    - Pass data to the components using [lit-element][]'s property binding, to avoid performance degradation due to serialization / de-serialization (attribute values are always strings).
  - Don't be scared to create many components. (E.g. it's OK to have one component for the container and one for the contained items.)
- Handle business logic inside redux
  - This includes decisions on what actionable items (e.g. edit buttons) to display in the UI
- **DON'T RELY ON CLIENT SECURITY!**<br>If you can tinker with stuff in Chrome dev tools, so can anyone else, right?!<br>**ALWAYS ENFORCE SECURITY ON THE SERVER SIDE!**

---

## Rationale

The [ts-wc-starter][] is a much simpler project, than the web app starter. While the web app also uses and consists of web components, it has many more tasks to fullfill, mainly:

- Deal with navigation
- Handle business logic
- Communicate with 3rd parties (APIs, backends)
- Distribute data around the app

### How the web app and the web components coexist

Following these starter projects, there is a separate project for web components and a separate project for a web app.

The web components should be able to stand on their own. That's why their project makes sure they behave like "good citizens". In general a web component should be parameterized through attributes and composed with nested elements, and as such be self-sufficient.

The web app has its own web components, too, i.e. the app shell, and view components. But those have different tasks.

Still, as the app is composed of web components, these packages help in writing them:

- [lit-html][]: The JavaScript templating engine used by [lit-element][], optimized for efficient updates. Part of Google's [Polymer project](https://www.polymer-project.org/).
- [lit-element][]: A base class for creating web components using [lit-html][]. It's part of Google's [Polymer project](https://www.polymer-project.org/) and the successor of the [Polymer library](https://polymer-library.polymer-project.org/).
- [TypeScript][]: A statically typed programming language, that is a super set of JavaScript. The static typing helps IDEs provide code suggestions and error detection.
- [tslib][]: A helper library. When the TypeScript compiler creates its output (i.e. JavaScript code), the code for certain TypeScript language features is taken from [tslib][] instead of being generated multiple times by the compiler. (This will save a few bytes per file processed.)

_Note:_ There is dispute going on over the benefits of static typing to JavaScript, but _I_ like it. JavaScript tooling has gotten much better, but I still prefer compiler errors over runtime errors.

### Application state

One of the key pieces of an application is maintaining _state_.

- [redux][]: A widely adopted library for managing state. One of the main benefits is the large ecosystem of extensions.
- [re-ducks][]: A proposal for structuring redux code in a modular way, grouping files by feature (instead of by file type).
- [redux-saga][]: A library for dealing with side-effects (i.e. asynchronous APIs) in redux, utilizing ES6 generators.
- [redux-devtools-extension][]: Chrome browser extension for working with [redux][], enabling "time travel debugging".
- [reselect][]: Selectors allow the consuming code to remain unaware of "where in the state tree" certain information resides and how it is represented. This is also handy for derived data. [Reselect][] is a library providing memoization (caching) for selectors.
- [reselect-tools][]: Chrome browser extension for working with [reselect][], showing selector dependencies and recalculation costs.
- [@captaincodeman/redux-connect-element][]: Enables simple mapping of redux state changes to element properties, and element events to redux actions. This basically auto-wires an HTML element (or web component) to the redux world.

### Routing

Routing generally means looking at the URL in the browser's location bar and "taking action" in accordance with it. The term "taking action" can mean (at least) two separate things, which may often go together, but _they don't have to_, and keeping things separate gives us this flexibility. These parts, and the libraries in use, are:

- [redux-first-routing][]: Handle the _data_ aspect of routing (which data does this route need?). Of course application data should go into redux.
- [universal-router][]: Handle the _view_ aspect of routing (what element should this route display? where should the output go?).

### Development server

To view web components we need to put them in an HTML page, and have that served from an HTTP server locally. Same is true for a web application built using web components.

- [browser-sync][]: Provide a development web server (for local testing/execution). _Bonus:_ browser-sync will synchronize the navigation on multiple connected instances, so you just "click through" your UI in one browser, but you can view results simultaneously on multiple browsers and/or devices.
- [connect-logger][]: A widely used logging middleware for web servers running on [nodejs][].
- [connect-history-api-fallback][]: Enable fallback-routing on the server side, which is required by HTML5 history API (i.e. client side routing within HTML5 SPAs).
- [compression][]: Enable compressed transmission of content over HTTP.

### Bundling

For production JavaScript code is typically optimizied for consumption through the target browser. One such optimization is _bundling_, i.e. pulling JavaScript code into a single file or a few files (often called chunks).

- [Rollup][]: JavaScript module bundler. Extensible through plugins.
- rollup-plugin-typescript: Enables Rollup to process TypeScript files.
- rollup-plugin-replace: Enables Rollup to replace text within files on the fly.
- rollup-plugin-commonjs: Enables Rollup to load JavaScript packages in CommonJS format (which is native to [nodejs][]).
- rollup-plugin-node-resolve: Enables Rollup to load modules by name (instead of by path).
- rollup-plugin-minify-html-literals: Enables HTML minification. (Reduces bundle size.)
- rollup-plugin-terser: Enables minification for other assets. (Reduces bundle size.)
- [source-map-explorer][]: Visualize bundle size, and i.e. inspect which package contributes how much to it.

### Supporting tools

These tools make "doing the right thing" (from my personal point of view) a little easier. Others might argue, that this is a pain in the ..., but for me it's automated QA with little extra effort.

- [eslint][]: Static code checks.
  - [@typescript-eslint/eslint-plugin][tseslint]: Plugin for TypeScript support.
  - [@typescript-eslint/parser][tseslint]: Parser for TypeScript files.
- [prettier][]: Code formatting. (Why would anyone ever format source code by hand?!)
- [jsonlint][]: Checks for JSON files.
- [husky][]: Integration for git hooks. Prevents commits of ill-formatted unlinted code.
- [commitlint][]: Lint git commit messages.
- [lint-staged][]: Run lint commands on staged files in git. Useful together with [husky][].

### The commands to run

You do not need to run these commands, but this is how all the components got into place. Maybe you'd rather run these commands instead of starting of this starter-project, after all...

```
npm init

npm install --save-dev \
 typescript \
 browser-sync \
 compression \
 connect-logger \
 connect-history-api-fallback

npm install --save \
 lit-html \
 lit-element \
 tslib

npm install --save \
 redux \
 redux-devtools-extension \
 reselect \
 reselect-tools \
 redux-saga \
 @captaincodeman/redux-connect-element

npm install --save \
 redux-first-routing \
 universal-router

npm install --save-dev \
 rollup \
 rollup-plugin-commonjs \
 rollup-plugin-minify-html-literals \
 rollup-plugin-node-resolve \
 rollup-plugin-replace \
 rollup-plugin-terser \
 rollup-plugin-typescript \
 source-map-explorer

npm install --save-dev \
 eslint \
 @typescript-eslint/eslint-plugin \
 @typescript-eslint/parser \
 prettier \
 jsonlint \
 husky \
 @commitlint/cli \
 @commitlint/config-conventional \
 lint-staged
```

[@captaincodeman/redux-connect-element]: https://github.com/CaptainCodeman/redux-connect-element
[browser-sync]: https://www.browsersync.io/
[commitlint]: https://commitlint.js.org/
[compression]: https://github.com/expressjs/compression
[connect-logger]: https://github.com/geta6/connect-logger
[connect-history-api-fallback]: https://github.com/bripkens/connect-history-api-fallback
[eslint]: https://eslint.org/
[husky]: https://github.com/typicode/husky/
[jsonlint]: http://zaach.github.com/jsonlint/
[lint-staged]: https://github.com/okonet/lint-staged
[lit-element]: https://lit-element.polymer-project.org/
[lit-html]: https://lit-html.polymer-project.org/
[nodejs]: https://nodejs.org/en/
[prettier]: https://prettier.io
[re-ducks]: https://github.com/alexnm/re-ducks
[redux]: https://redux.js.org/
[redux-devtools-extension]: https://github.com/zalmoxisus/redux-devtools-extension
[redux-first-routing]: https://www.freecodecamp.org/news/an-introduction-to-the-redux-first-routing-model-98926ebf53cb/
[redux-saga]: https://redux-saga.js.org/
[reselect]: https://github.com/reduxjs/reselect
[reselect-tools]: https://github.com/skortchmark9/reselect-tools
[rollup]: https://rollupjs.org/guide/en/
[source-map-explorer]: https://github.com/danvk/source-map-explorer
[ts-wc-starter]: https://github.com/djlauk/ts-wc-starter
[tseslint]: https://typescript-eslint.io/
[tslib]: https://github.com/Microsoft/tslib
[typescript]: https://www.typescriptlang.org/
[universal-router]: https://www.kriasoft.com/universal-router/
