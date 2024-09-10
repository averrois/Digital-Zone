<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
  isClose: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["close"])
const modalRef = ref(null)

function closeModal() {
  emit("close")
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape" && !props.isClose) {
    closeModal()
  }
}

const outSideClick = () => console.log("its clicked")

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <div v-if="!isClose" class="absolute w-full h-full z-[600] left-0 top-0 flex justify-center items-center">
    <div class="blur_bg"></div>
    <div @click.self="closeModal" class="fixed inset-0 flex items-center justify-center z-[600] m-6" :class="{ hidden: isClose }">
      <div class="bg-white border-grey-200 border-2 rounded shadow-lg p-6 w-full max-w-5xl mx-auto">
        <div class="flex justify-between items-center">
          <h2 class="text-primary-50 text-2xl font-bold">{{ title }}</h2>
          <button @click="closeModal" class="text-darkblue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.blur_bg {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.562);
  z-index: 599;
  backdrop-filter: blur(5px);
}
a {
  text-decoration: none;
}
</style>
