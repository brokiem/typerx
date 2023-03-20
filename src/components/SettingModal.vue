<template>
  <TransitionRoot appear :show="variablesStore.isSettingOpen" as="template">
    <Dialog as="div" @close="setOpen(false)" class="relative z-10">
      <TransitionChild as="template" enter="duration-25 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-25 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-[4px] bg-white dark:bg-dark-secondary p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white"> Settings </DialogTitle>
              <div class="mt-4">
                <div class="mb-3">
                  <label for="font" class="text-gray-800 dark:text-white block mb-1">Font</label>
                  <select
                    v-model="selectedFont"
                    class="w-full border-gray-400 border-1 rounded-[4px] py-2 px-3 text-gray-900 leading-tight dark:text-white dark:bg-dark-tertiary focus:outline-none focus:border-blue-600"
                  >
                    <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="theme" class="text-gray-800 dark:text-white block mb-1">Sentence count</label>
                  <select
                    v-model="selectedSentenceCount"
                    class="w-full border-gray-400 border-1 rounded-[4px] py-2 px-3 text-gray-900 leading-tight dark:text-white dark:bg-dark-tertiary focus:outline-none focus:border-blue-600"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="theme" class="text-gray-800 dark:text-white block mb-1">Theme</label>
                  <select
                    v-model="selectedTheme"
                    class="w-full border-gray-400 border-1 rounded-[4px] py-2 px-3 text-gray-900 leading-tight dark:text-white dark:bg-dark-tertiary focus:outline-none focus:border-blue-600"
                  >
                    <option value="auto">System</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
              </div>

              <div class="mt-4 flex">
                <div class="grow"></div>
                <button type="button" class="button inline-flex justify-center" @click="setOpen(false)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" class="inline text-white mr-1">
                    <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
                  </svg>
                  DONE
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue"
import { useVariablesStore } from "@/stores/variables"
import { defineComponent } from "vue"

export default defineComponent({
  name: "SettingModal",
  components: {
    ListboxOption,
    ListboxOptions,
    ListboxButton,
    Listbox,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle
  },
  setup() {
    const variablesStore = useVariablesStore()

    const setOpen = (value) => {
      variablesStore.isSettingOpen = value
    }

    return {
      variablesStore,
      setOpen
    }
  },
  data() {
    return {
      fonts: ["Inter", "Times New Roman", "Monospace"],
      selectedFont: "Inter",
      selectedTheme: "auto",
      selectedSentenceCount: "2"
    }
  },
  beforeMount() {
    this.selectedFont = localStorage.getItem("font") || "Inter"
    this.selectedTheme = localStorage.getItem("theme") || "auto"
    this.selectedSentenceCount = localStorage.getItem("sentence_count") || "2"
  },
  watch: {
    selectedFont: function (val) {
      localStorage.setItem("font", val)
      document.documentElement.style.setProperty("--font", val)
    },
    selectedTheme: function (val) {
      localStorage.setItem("theme", val)

      if (val === "auto") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark")
          document.documentElement.style.setProperty("--color-background", "var(--vt-c-black)")
          document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-dark-2)")
        } else {
          document.documentElement.classList.remove("dark")
          document.documentElement.style.setProperty("--color-background", "var(--vt-c-white)")
          document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-light-1)")
        }
      } else {
        document.documentElement.classList.toggle("dark", val === "dark")

        if (val === "dark") {
          document.documentElement.style.setProperty("--color-background", "var(--vt-c-black)")
          document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-dark-2)")
        } else {
          document.documentElement.style.setProperty("--color-background", "var(--vt-c-white)")
          document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-light-1)")
        }
      }
    },
    selectedSentenceCount: function (val) {
      localStorage.setItem("sentence_count", val)
    }
  }
})
</script>

<style scoped></style>
