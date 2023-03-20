import { ref } from "vue"
import { defineStore } from "pinia"

export const useVariablesStore = defineStore("variables", () => {
  const isSettingOpen = ref(false)
  const isResultOpen = ref(false)

  return { isSettingOpen, isResultOpen }
})
