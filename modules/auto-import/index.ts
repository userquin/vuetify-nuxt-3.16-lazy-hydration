import { defineNuxtModule } from "@nuxt/kit";
import type { VuetifyComposablesOptions, VuetifyDirectivesOptions} from "./unimport";
import { VuetifyComposables, VuetifyDirectives } from "./unimport";
import { resolveVuetifyImportMaps, toKebabCase } from "./utils";
import type { VuetifyComponent } from "./types";
import type {Addon, AddonsOptions} from "unimport";

export interface ModuleOptions {
    composables?: VuetifyComposablesOptions
    directives?: VuetifyDirectivesOptions
}

export default defineNuxtModule<ModuleOptions>({
    async setup(options, nuxt) {

        nuxt.hook('imports:sources', (sources) => {
            sources.push(
                VuetifyDirectives(options.directives),
                VuetifyComposables(options.composables),
            )
        })

        const imports = nuxt.options.imports
        imports.addons = buildAddonOptions(imports.addons as AddonsOptions | Addon[] | undefined)

        nuxt.hook('components:extend', async (c) => {
            const [components, labs] = await Promise.all(
                resolveVuetifyImportMaps()
            )
            // Vuetify 3.7.11+ resolves to subpath exports instead of a file in /lib
            function patchExtension(path: string) {
                return path.endsWith('.mjs') ? `lib/${path}` : path
            }
            const map = new Map<string, VuetifyComponent>()
            Object.entries(components.components).forEach(([component, entry]) => {
                map.set(component, {
                    from: `vuetify/${patchExtension(entry.from)}`,
                })
            })
            Object.entries(labs.components).forEach(([component, entry]) => {
                map.set(component, {
                    from: `vuetify/${patchExtension(entry.from)}`,
                })
            })
            for (const [component, entry] of map.entries()) {
                c.push({
                    pascalName: component,
                    kebabName: toKebabCase(component),
                    export: component,
                    filePath: entry.from,
                    shortPath: entry.from,
                    chunkName: toKebabCase(component),
                    prefetch: false,
                    preload: false,
                    global: false,
                    mode: 'all',
                })
            }
        })
        // hack vuetify nuxt module removing the vuetify vite plugin
        nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
            viteInlineConfig.plugins = viteInlineConfig.plugins || []
            viteInlineConfig.plugins.push({
                name: 'remove:vuetify:import:nuxt',
                enforce: 'post',
                configResolved(config) {
                    const idx = config.plugins.findIndex(plugin => plugin.name === 'vuetify:import:nuxt')
                    if (idx > -1) {
                        config.plugins.splice(idx, 1)
                    }
                }
            })
        })
    }
})

function buildAddonOptions(addons?: AddonsOptions | Addon[]): AddonsOptions {
    if (!addons)
        return { vueDirectives: true }

    if (Array.isArray(addons))
        return { vueDirectives: true, addons }

    return {
        ...addons,
        vueDirectives: addons.vueDirectives ?? true,
        addons: addons.addons,
    }
}