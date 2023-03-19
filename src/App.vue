<script setup lang="ts">
import { RouterView } from "vue-router"

if (localStorage.theme === "auto" || !localStorage.theme) {
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
  document.documentElement.classList.toggle("dark", localStorage.theme === "dark")

  if (localStorage.theme === "dark") {
    document.documentElement.style.setProperty("--color-background", "var(--vt-c-black)")
    document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-dark-2)")
  } else {
    document.documentElement.style.setProperty("--color-background", "var(--vt-c-white)")
    document.documentElement.style.setProperty("--color-text", "var(--vt-c-text-light-1)")
  }
}
</script>

<template>
  <RouterView />
</template>
