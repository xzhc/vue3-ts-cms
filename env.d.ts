/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const copmponent: DefineComponent
  export default copmponent
}
