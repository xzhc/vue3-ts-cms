import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ count: 100 }),
  getters: {
    double: (state) => {
      return state.count * 2
    }
  },
  actions: {
    changeCounterAction(newCounter: number) {
      this.count = newCounter
    }
  }
})

export default useCounterStore
