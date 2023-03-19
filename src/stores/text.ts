import { ref } from "vue"
import { defineStore } from "pinia"

export const useTextStore = defineStore("text", () => {
  const text = ref("")
  const correctKeystrokes = ref(0)
  const isTextProcessing = ref(false)
  const isTextLoaded = ref(false)

  return { text, correctKeystrokes, isTextLoaded, isTextProcessing }
})
