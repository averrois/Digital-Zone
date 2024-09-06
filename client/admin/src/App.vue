<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import Navbar from "./components/Navbar.vue"
</script>

<template>
  <Navbar />
  <div class="container  mx-auto px-6 py-4">
  <RouterView />
  </div>
</template>
