# Vuetify + Nuxt 3.16 + Vue Lazy Hydration

This repository using Nuxt `components:extend` hook to register Vuetify components to allow use [Vue Lazy Hydration](https://blog.vuejs.org/posts/vue-3-5#lazy-hydration) (🤞 ) via [Nuxt Delayed Hydration Support](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support).

Right now, [Nuxt Delayed Hydration Support](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support) is not working since Vuetify using `slots` almost on every component and will require a lot of work to make it work.

This repository contains some code that will be included at Vuetify and Vuetify Nuxt module:
- Vuetify will export composable and directive `unimport` presets 
- Vuetify Nuxt Module will use previous Vuetify `unimport` presets and will use the logic in the auto-import module in this template to configure the Vuetify components.

To start the dev server, run from the terminal:
- `pnpm install` to install dependencies
- `pnpm dev` to start the dev server

The `main` branch using Vuetify `v3.7.16` and Vuetify Nuxt Module `v0.18.4` and includes:
- vuetify module to fix the `unhead v2` changes that breaks Vuetify styles
- vite plugin to remove Vuetify Vite plugin registered by the Vuetify Nuxt mdoule

The `dev` branch using local Vuetify tgz file from Vuetify `dev` branch.

The `dev-pr-21104` branch using local Vuetify tgz file from this Vuetify PR [fix:fix vuetify types and simplify package exports](https://github.com/vuetifyjs/vuetify/pull/21104).

## Screenshots

![Vuetify Directives](./directives.png 'Nuxt devtools showing Vuetify directives')

![VSCode and Vuetify Directives](./vscode-directives.png 'VSCode and Vuetify directives')

![WebStorm and Vuetify Directives](./webstorm-directives.png 'WebStorm and Vuetify directives')

![Vuetify Nuxt Lazy Components](./lazy-components.png 'Vuetify Nuxt Lazy Components')
