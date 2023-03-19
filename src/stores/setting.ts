import { ref } from "vue"
import { defineStore } from "pinia"

export const useSettingStore = defineStore("setting", () => {
  const isOpen = ref(false)

  return { isOpen }
})
