<template>
  <SettingModal />
  <EndModal />

  <div class="flex flex-col justify-center items-center mx-5">
    <div class="max-w-5xl w-full mt-10">
      <div class="flex select-none">
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill="currentColor" class="inline mr-3"><path d="M4.458 35q-1.125 0-1.958-.833-.833-.834-.833-1.959V9.458q0-1.125.833-1.958t1.958-.833h31.084q1.125 0 1.958.833t.833 1.958v22.75q0 1.125-.833 1.959-.833.833-1.958.833Zm8.334-6.167h14.416V26.5H12.792Zm-4.959-5.708h3.542v-3.5H7.833Zm6.959 0h3.5v-3.5h-3.5Zm6.916 0h3.5v-3.5h-3.5Zm6.917 0h3.542v-3.5h-3.542ZM7.833 16.292h3.542v-3.5H7.833Zm6.959 0h3.5v-3.5h-3.5Zm6.916 0h3.5v-3.5h-3.5Zm6.917 0h3.542v-3.5h-3.542Z"/></svg>
        <a href="/" class="text-4xl font-bold text-center">
          TyperX
        </a>
      </div>

      <div class="flex gap-3 mt-16">
        <div class="card mb-3 py-2">Time Elapsed: {{ statsStore.time }}s</div>
        <div class="card mb-3 py-2">WPM: {{ statsStore.wpm }}</div>
        <div class="card mb-3 py-2">CPM: {{ statsStore.cpm }}</div>
        <div class="card mb-3 py-2">Accuracy: {{ statsStore.accuracy === null ? "N/A" : statsStore.accuracy + "%" }} {{ is_end ? `(${textStore.correctKeystrokes} of ${textStore.text.length} chars)` : "" }}</div>

        <div class="grow"></div>

        <button @click="restart" name="Restart" id="restart-button" class="button px-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline text-white">
            <path
              d="M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713 1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6 9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z"
            />
          </svg>
        </button>
        <button @click="openSetting" name="Settings" id="setting-button" class="button px-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" class="inline text-white">
            <path
              d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Z"
            />
          </svg>
        </button>
      </div>

      <div id="text-card" class="card text-[rgba(35,35,35,0.66)] dark:text-[rgba(235,235,235,0.64)] overflow-hidden">
        <p class="text-2xl select-none leading-10 underline-offset-[10px] tracking-wider" style="font-family: var(--font) !important">
          <span v-if="textStore.isTextLoaded" v-for="(word, index) in textStore.text.split(/(\s+)/)" :id="'word-' + index">
            <span v-for="(char, index) in word.split('')" :id="'char-' + index">
              {{ char }}
            </span>
          </span>

          <span v-else>
            <span role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </span>
            Loading text<span class="dot dot-1">.</span><span class="dot dot-2">.</span><span class="dot dot-3">.</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useTextStore } from "@/stores/text"
import { useVariablesStore } from "@/stores/variables"
import { useStatsStore } from "@/stores/stats"
import SettingModal from "@/components/SettingModal.vue"
import EndModal from "@/components/EndModal.vue"

export default defineComponent({
  name: "TypeView",
  components: { EndModal, SettingModal },
  data() {
    return {
      completed_text: "",
      active_word_id: 0,
      active_text_id: 0,
      is_wrong: false,
      start_time: null as number | null,
      end_time: null as number | null,
      time_elapsed_interval_id: undefined as number | undefined,
      is_end: false
    }
  },
  setup() {
    const textStore = useTextStore()
    const variablesStore = useVariablesStore()
    const statsStore = useStatsStore()

    textStore.isTextProcessing = true
    textStore.isTextLoaded = false
    textStore.text = ""

    const sentenceCount = localStorage.getItem("sentence_count") || "2"
    fetch(`https://rest-type-mania.hop.sh/sentences/${sentenceCount}`)
      .then((response) => response.json())
      .then((data) => {
        textStore.isTextLoaded = true
        textStore.isTextProcessing = false

        if (!data.error) {
          textStore.text = data.message.join(" ")
          textStore.correctKeystrokes = data.message.join(" ").length
        } else {
          textStore.text = "Error loading text"
        }
      })

    return {
      textStore,
      variablesStore,
      statsStore
    }
  },
  mounted() {
    this.textStore.$subscribe((mutation, state) => {
      const word_element = document.getElementById("word-" + this.active_word_id)
      const char_element = word_element?.children[this.active_text_id]
      word_element?.classList.add("underline")
      char_element?.classList.add("typing")
    })

    document.addEventListener("restart", () => {
      this.restart();
    });

    document.onkeydown = (e) => {
      const word_element_prev = document.getElementById("word-" + (this.active_word_id - 1))
      const word_element = document.getElementById("word-" + this.active_word_id)
      const char_element = word_element?.children[this.active_text_id]

      if (e.key === char_element?.innerHTML) {
        document.getElementById("setting-button")?.blur()
        document.getElementById("restart-button")?.blur()

        if (this.start_time === null) {
          this.start_time = Date.now()
          this.statsStore.incrementTime();

          this.time_elapsed_interval_id = setInterval(() => {
            this.statsStore.incrementTime();
          }, 1000)
        }

        if (this.is_wrong) {
          return
        }

        this.is_wrong = false
        this.completed_text += e.key

        if (this.active_word_id + 1 === (word_element?.parentElement?.children.length ?? 0) && this.active_text_id + 1 === (word_element?.children.length ?? 0)) {
          word_element_prev?.classList.remove("underline")
          word_element?.classList.remove("underline")
          char_element?.classList.remove("typing")
          char_element?.classList.add("text-gray-900", "dark:text-white")

          this.end_time = Date.now()
          clearInterval(this.time_elapsed_interval_id)

          const timeInSeconds = (this.end_time - this.start_time) / 1000
          const { wpm, cpm } = this.calculateTypingSpeed(this.textStore.text, timeInSeconds)
          const accuracy = this.calculateTypingAccuracy(this.textStore.text, this.textStore.correctKeystrokes)

          this.statsStore.wpm = wpm
          this.statsStore.cpm = cpm
          this.statsStore.accuracy = accuracy
          this.is_end = true
          this.variablesStore.isResultOpen = true;

          this.start_time = null
          this.end_time = null
          return
        }

        if (e.key === " ") {
          const timeInSeconds = (Date.now() - this.start_time) / 1000
          const { wpm, cpm } = this.calculateTypingSpeed(this.completed_text, timeInSeconds)
          const accuracy = this.calculateTypingAccuracy(this.textStore.text, this.textStore.correctKeystrokes)

          this.statsStore.wpm = wpm
          this.statsStore.cpm = cpm
          this.statsStore.accuracy = accuracy

          word_element_prev?.classList.remove("underline")
          word_element?.classList.remove("underline")
        }

        char_element?.classList.add("text-gray-900", "dark:text-white")
        char_element?.classList.remove("typing")
        char_element?.classList.remove("bg-red-500")

        if (this.active_text_id + 1 < (word_element?.children.length ?? 0)) {
          this.active_text_id++
          word_element?.children[this.active_text_id].classList.add("typing")
        } else {
          this.active_word_id++
          this.active_text_id = 0

          const word_element = document.getElementById("word-" + this.active_word_id)
          const char_element = word_element?.children[this.active_text_id]
          word_element?.classList.add("underline")
          char_element?.classList.add("typing")
        }
      } else {
        if (e.key === "Backspace") {
          this.is_wrong = false
          char_element?.classList.remove("bg-red-500")
          char_element?.classList.add("typing")

          if (this.active_text_id + 1 < (word_element?.children.length ?? 0)) {
            const char_element_next = word_element?.children[this.active_text_id + 1]
            char_element_next?.classList.remove("typing")
          } else {
            const word_element_next = document.getElementById("word-" + (this.active_word_id + 1))
            const char_element_next = word_element_next?.children[0]
            char_element_next?.classList.remove("typing")
          }
          return
        }

        if (e.key.length > 1) {
          return
        }

        if (!this.is_wrong) {
          this.textStore.correctKeystrokes -= 1
          this.statsStore.accuracy = this.calculateTypingAccuracy(this.textStore.text, this.textStore.correctKeystrokes)
        }

        this.is_wrong = true
        char_element?.classList.add("bg-red-500")
        char_element?.classList.remove("typing")

        if (this.active_text_id + 1 < (word_element?.children.length ?? 0)) {
          const char_element_next = word_element?.children[this.active_text_id + 1]
          char_element_next?.classList.add("typing")
        } else {
          const word_element_next = document.getElementById("word-" + (this.active_word_id + 1))
          const char_element_next = word_element_next?.children[0]
          char_element_next?.classList.add("typing")
        }
      }
    }
  },
  methods: {
    openSetting() {
      this.variablesStore.isSettingOpen = true
      document.getElementById("setting-button")?.blur()
    },
    calculateTypingSpeed(text: string, timeInSeconds: number) {
      const numberOfCharacters = text.trim().length
      const numberOfWords = Math.round(numberOfCharacters / 5)
      const timeInMinutes = timeInSeconds / 60
      const wpm = Math.round(numberOfWords / timeInMinutes)
      const cpm = Math.round(numberOfCharacters / timeInMinutes)
      return { wpm, cpm }
    },
    calculateTypingAccuracy(text: string, correctKeystrokes: number) {
      return Math.round((correctKeystrokes / text.length) * 100)
    },
    restart() {
      document.getElementById("restart-button")?.blur()

      clearInterval(this.time_elapsed_interval_id)

      this.is_end = false
      this.is_wrong = false
      this.active_word_id = 0
      this.active_text_id = 0
      this.completed_text = ""
      this.start_time = null
      this.end_time = null
      this.time_elapsed_interval_id = undefined
      this.statsStore.reset();

      if (this.textStore.isTextProcessing) {
        return
      }

      this.textStore.isTextProcessing = true
      this.textStore.isTextLoaded = false
      this.textStore.text = ""

      const sentenceCount = localStorage.getItem("sentence_count") || "2"
      fetch(`https://rest-type-mania.hop.sh/sentences/${sentenceCount}`)
        .then((response) => response.json())
        .then((data) => {
          this.textStore.isTextLoaded = true
          this.textStore.isTextProcessing = false

          if (!data.error) {
            this.textStore.text = data.message.join(" ")
            this.textStore.correctKeystrokes = data.message.join(" ").length
          } else {
            this.textStore.text = "Error loading text"
          }
        })
    }
  }
})
</script>

<style scoped>
.typing {
  background-image: url("data:image/gif;base64,R0lGODlhAQAoAPABAERmZv///yH5BAg1AAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAAQAoAAACBYSPqctYACH5BAg1AAAALAAAAAABACgAgP///////wIFhI+py1gAOw==");
  background-repeat: repeat-y;
}

.dot {
  display: inline-block;
  opacity: 20%;
  animation: dot-blink 1s infinite;
}

.dot-1 {
  animation-delay: 0.1s;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.3s;
}

@keyframes dot-blink {
  0% {
    opacity: 20%;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 20%;
  }
}
</style>
