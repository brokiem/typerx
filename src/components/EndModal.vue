<template>
  <TransitionRoot appear :show="variablesStore.isResultOpen" as="template">
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
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Results</DialogTitle>
              <div class="mt-4">
                <p class="text-gray-800 dark:text-white mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline mr-1">
                    <path
                      d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                  </svg>
                  You took {{ statsStore.time }} seconds to complete the test.
                </p>
                <p class="text-gray-800 dark:text-white mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline mr-1">
                    <path
                      d="M3 21q-.825 0-1.412-.587Q1 19.825 1 19V6q0-.825.588-1.412Q2.175 4 3 4h18q.825 0 1.413.588Q23 5.175 23 6v13q0 .825-.587 1.413Q21.825 21 21 21Zm5-4h8v-1H8Zm-3-3h2v-2H5Zm4 0h2v-2H9Zm4 0h2v-2h-2Zm4 0h2v-2h-2ZM5 10h2V8H5Zm4 0h2V8H9Zm4 0h2V8h-2Zm4 0h2V8h-2Z"
                    />
                  </svg>
                  You typed {{ textStore.correctKeystrokes }} chars correctly and {{ textStore.text.length - textStore.correctKeystrokes }} chars incorrectly.
                </p>
                <p class="text-gray-800 dark:text-white mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline mr-1">
                    <path
                      d="M10.45 15.5q.625.625 1.575.587.95-.037 1.375-.687L19 7l-8.4 5.6q-.65.45-.712 1.362-.063.913.562 1.538ZM5.1 20q-.55 0-1.012-.238-.463-.237-.738-.712-.65-1.175-1-2.437Q2 15.35 2 14q0-2.075.788-3.9.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 4 12 4q2.05 0 3.85.775 1.8.775 3.15 2.113 1.35 1.337 2.15 3.124.8 1.788.825 3.838.025 1.375-.312 2.688-.338 1.312-1.038 2.512-.275.475-.737.712-.463.238-1.013.238Z"
                    />
                  </svg>
                  Your typing speed is {{ statsStore.wpm }} WPM and {{ statsStore.cpm }} CPM.
                </p>

                <p class="text-gray-800 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline mr-1">
                    <path
                      d="M12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2h1v8.275q.45.275.725.712Q14 11.425 14 12q0 .825-.587 1.412Q12.825 14 12 14q-.825 0-1.412-.588Q10 12.825 10 12q0-.575.275-1.025.275-.45.725-.7v-2.15q-1.3.35-2.15 1.412Q8 10.6 8 12q0 1.65 1.175 2.825Q10.35 16 12 16q1.65 0 2.825-1.175Q16 13.65 16 12q0-.9-.363-1.663-.362-.762-.987-1.337l1.425-1.425q.875.825 1.4 1.962Q18 10.675 18 12q0 2.5-1.75 4.25T12 18q-2.5 0-4.25-1.75T6 12q0-2.25 1.425-3.912Q8.85 6.425 11 6.075V4.05q-2.975.375-4.987 2.625Q4 8.925 4 12q0 3.35 2.325 5.675Q8.65 20 12 20q3.35 0 5.675-2.325Q20 15.35 20 12q0-1.725-.675-3.225t-1.85-2.6L18.9 4.75q1.425 1.375 2.263 3.237Q22 9.85 22 12q0 2.075-.788 3.9-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                  </svg>
                  Your accuracy is {{ statsStore.accuracy === null ? "N/A" : statsStore.accuracy + "%" }}.
                  <span v-if="statsStore.accuracy !== null && statsStore.accuracy >= 90">👍</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 80">🙂</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 70">😐</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 60">🙁</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 50">😞</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 30">😠</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 20">😤</span>
                  <span v-else-if="statsStore.accuracy !== null && statsStore.accuracy >= 0">😡</span>
                </p>
              </div>

              <div class="mt-4 flex gap-3">
                <div class="grow"></div>
                <button type="button" id="restart-button-modal" class="button inline-flex justify-center" @click="restart">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline text-white">
                    <path
                      d="M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713 1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6 9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z"
                    />
                  </svg>
                </button>

                <button type="button" class="button inline-flex justify-center" @click="setOpen(false)">OK</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useStatsStore } from "@/stores/stats"
import { useTextStore } from "@/stores/text"
import { useVariablesStore } from "@/stores/variables"
import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, TransitionChild, TransitionRoot } from "@headlessui/vue"

export default {
  name: "EndModal",
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
    const textStore = useTextStore()
    const statsStore = useStatsStore()
    const variablesStore = useVariablesStore()

    const setOpen = (value) => {
      variablesStore.isResultOpen = value
    }

    return {
      textStore,
      statsStore,
      variablesStore,
      setOpen
    }
  },
  methods: {
    restart() {
      setTimeout(() => {
        document.getElementById("restart-button-modal")?.blur()
      }, 500)

      const event = new CustomEvent("restart")
      document.dispatchEvent(event)

      this.setOpen(false)
    }
  }
}
</script>

<style scoped></style>
