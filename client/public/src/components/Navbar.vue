<script lang="ts" setup>
import { ref } from "vue"

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="relative bg-white shadow">
    <div class="container mx-auto px-6 py-4 md:flex md:items-center md:justify-between">
      <div class="flex items-center justify-between">
        <a href="#">
          <span class="text-xl font-bold">Logo</span>
        </a>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button @click="toggleMenu" type="button" class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none" aria-label="toggle menu">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div
        :class="[isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full']"
        class="absolute inset-x-0 z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out md:relative md:top-0 md:mt-0 md:flex md:w-auto md:translate-x-0 md:items-center md:bg-transparent md:p-0 md:opacity-100"
      >
        <div class="flex flex-col md:mx-6 md:flex-row">
          <a class="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0" href="#">Home</a>
          <a class="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0" href="#">Shop</a>
          <a class="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0" href="#">Contact</a>
          <a class="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0" href="#">About</a>
        </div>
      </div>
    </div>
  </nav>
</template>
