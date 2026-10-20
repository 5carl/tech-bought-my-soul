export type Options = readonly string[]

declare module 'claude-code' {
  interface PluginState {
    'tech-bought-my-soul': { options: Options }
  }
}
