import { readFile } from 'node:fs/promises'
import path from 'upath'
import { createRequire } from 'node:module'
import process from 'node:process'

// Types
import type { ImportComponents, ImportMaps } from './types'

const require = createRequire(import.meta.url)

export function resolveVuetifyBase (paths = [process.cwd()]) {
    return path.dirname(require.resolve('vuetify/package.json', { paths }))
}

export function resolveVuetifyImportMaps (
    paths = [process.cwd()]
): ImportMaps {
    const vuetifyBase = resolveVuetifyBase(paths)
    return [importMap(vuetifyBase), importMapLabs(vuetifyBase)]
}

export function resolveVuetifyImportMap (paths = [process.cwd()]) {
    return importMap(resolveVuetifyBase(paths))
}

export function resolveVuetifyImportMapLabs (paths = [process.cwd()]) {
    return importMapLabs(resolveVuetifyBase(paths))
}

async function importMap (vuetifyBase: string): Promise<ImportComponents> {
    return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap.json'), 'utf-8'))
}
async function importMapLabs (vuetifyBase: string): Promise<ImportComponents> {
    return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap-labs.json'), 'utf-8'))
}

/**
 * Convert string to kebap-case
 */
export function toKebabCase(str = '') {
    if (toKebabCase.cache.has(str))
        return toKebabCase.cache.get(str)!

    const kebab = str
        .replace(/[^a-z]/gi, '-')
        .replace(/\B([A-Z])/g, '-$1')
        .toLowerCase()

    toKebabCase.cache.set(str, kebab)

    return kebab
}

toKebabCase.cache = new Map<string, string>()

