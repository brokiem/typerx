import type { Ref } from "vue"
import { ref } from "vue"
import { defineStore } from "pinia"

export const useStatsStore = defineStore("stats", () => {
  const wpm = ref(0)
  const accuracy: Ref<number | null> = ref(null)
  const time = ref(0)
  const cpm = ref(0)

  const reset = () => {
    wpm.value = 0
    accuracy.value = null
    time.value = 0
    cpm.value = 0
  }

  const incrementTime = () => {
    time.value++
  }

  return { wpm, accuracy, time, cpm, reset, incrementTime }
})
