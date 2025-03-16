export interface VuetifyComponent {
    from: string
}
export type DirectiveName = keyof typeof import('vuetify/directives')
export interface VuetifyComponents {
    [key: string]: VuetifyComponent
}
export interface ImportComponents {
    components: VuetifyComponents
    directives: DirectiveName[]
}
export type ImportMaps = [importMaps: Promise<ImportComponents>, importMapsLabs: Promise<ImportComponents>]
