import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    setup() {
        // add vite plugin to patch vuetify theme composable
        const detectorRegexp = /\/vuetify\/lib\/composables\/theme\.m?js/
        const replaceRegexp = /children: styles.value,\s+id:/
        addVitePlugin({
            name: 'vuetify-theme-fix',
            enforce: 'pre',
            transform(code, id) {
                if (detectorRegexp.test(id)) {
                    const match = code.match(replaceRegexp)
                    if (match?.index) {
                        return `${code.slice(0, match.index -1)}textContent${code.slice(match.index + 'children'.length)}`
                    }
                }
            }
        })
    }
})