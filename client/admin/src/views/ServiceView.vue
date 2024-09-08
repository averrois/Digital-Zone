<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useServices } from "../composables/useServices"
import type { ServiceType } from "@/types"
import ServiceCard from "@/components/ServiceCard.vue"

const { services, error, loading, getServices } = useServices()

onMounted(async () => {
  await getServices()
})

const handleServiceUpdated = (updatedService: ServiceType) => {
  const index = services.value.findIndex((s) => s._id === updatedService._id)
  if (index !== -1) {
    services.value[index] = updatedService
  }
}

const handleServiceDeleted = (deletedServiceId: string) => {
  services.value = services.value.filter((s) => s._id !== deletedServiceId)
}
</script>

<template>
  <div class="service-view">
    <h1>Our Services</h1>
    <div v-if="loading">Loading services...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="service-grid">
      <ServiceCard
        v-for="service in services"
        :key="service._id"
        :_id="service._id"
        :title="service.title"
        :description="service.description"
        @service-updated="handleServiceUpdated"
        @service-deleted="handleServiceDeleted"
      />
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
