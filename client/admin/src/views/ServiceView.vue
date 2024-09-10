<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useServices } from "../composables/useServices"
import type { ServiceType } from "@/types"
import ServiceCard from "@/components/ServiceCard.vue"
import ModalWrapper from "@/components/ModalWrapper.vue"

const { services, error, loading, getServices, createService } = useServices()

const isCreateModalOpen = ref(false)
const newService = ref({ title: "", content: "" })

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

const openCreateModal = () => {
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  newService.value = { title: "", content: "" }
}

const handleCreateService = async () => {
  try {
    const createdService = await createService(newService.value)
    if (createdService) {
      closeCreateModal()
    } else {
      throw new Error("Failed to create service")
    }
  } catch (error) {
    console.error("Failed to create service:", error)
    // Show an error message to the user
  }
}
</script>

<template>
  <div class="service-view">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Our Services</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">Create New Service</button>
    </div>

    <div v-if="loading">Loading services...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="service-grid">
      <ServiceCard
        v-for="service in services"
        :key="service._id"
        :_id="service._id"
        :title="service.title"
        :content="service.content"
        @service-updated="handleServiceUpdated"
        @service-deleted="handleServiceDeleted"
      />
    </div>

    <ModalWrapper :is-close="!isCreateModalOpen" title="Create New Service" @close="closeCreateModal">
      <form @submit.prevent="handleCreateService">
        <div class="mb-4">
          <label for="new-title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="new-title"
            v-model="newService.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div class="mb-4">
          <label for="new-content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="new-content"
            v-model="newService.content"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Service</button>
        </div>
      </form>
    </ModalWrapper>
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
