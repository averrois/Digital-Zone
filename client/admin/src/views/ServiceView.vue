<script setup lang="ts">
import { onMounted } from "vue"
import { useServices } from "../composables/useServices"
import ServiceCard from "../components/ServiceCard.vue"

const { services, error, loading, getServices } = useServices()

onMounted(async () => {
  await getServices()
})
</script>

<template>
  <div class="service-view">
    <h1>Our Services</h1>
    <div v-if="loading">Loading services...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="service-grid">
      <ServiceCard v-for="service in services" :key="service._id" :id="service._id" :title="service.title" :description="service.description" />
    </div>
  </div>
</template>

<style scoped>
.service-view {
  padding: 20px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
