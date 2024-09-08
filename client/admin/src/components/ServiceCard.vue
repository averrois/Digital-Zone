<script setup lang="ts">
import { ref } from "vue"
import ModalWrapper from "@/components/ModalWrapper.vue"
import type { ServiceType } from "@/types"
import { useServices } from "@/composables/useServices"

const props = defineProps<{
  _id: string
  title: string
  description: string
}>()

const emit = defineEmits(["serviceUpdated", "serviceDeleted"])

const { updateService, deleteService } = useServices()

const isModalOpen = ref(false)
const modalTitle = ref("")
const modalAction = ref<"edit" | "delete" | null>(null)
const editForm = ref({ _id: props._id, title: props.title, description: props.description })

const openEditModal = () => {
  modalTitle.value = "Edit Service"
  modalAction.value = "edit"
  isModalOpen.value = true
}

const openDeleteModal = () => {
  modalTitle.value = "Delete Service"
  modalAction.value = "delete"
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  modalAction.value = null
}

const handleEdit = async () => {
  if (modalAction.value === "edit") {
    try {
      const updatedService = await updateService(props._id, editForm.value)
      emit("serviceUpdated", updatedService)
      closeModal()
    } catch (error) {
      console.error("Failed to update service:", error)
      // Show an error message to the user
    }
  }
}

const handleDelete = async () => {
  if (modalAction.value === "delete") {
    try {
      await deleteService(props._id)
      emit("serviceDeleted", props._id)
      closeModal()
    } catch (error) {
      console.error("Failed to delete service:", error)
      // Show an error message to the user
    }
  }
}
</script>

<template>
  <div class="relative p-4 bg-white shadow-xl rounded-xl">
    <!-- Image -->
    <div class="flex items-center justify-center mx-auto">
      <img
        class="h-full rounded-lg"
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Sample Image"
      />
    </div>
    <!-- Content -->
    <div class="mt-5 text-center">
      <h3 class="text-lg font-medium text-gray-800">{{ title }}</h3>
      <p class="mt-2 text-gray-500">{{ description }}</p>
    </div>
    <!-- Buttons -->
    <div class="flex justify-between mt-5">
      <button @click="openEditModal" class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-300">Edit</button>
      <button @click="openDeleteModal" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors duration-300">Delete</button>
    </div>

    <ModalWrapper :is-close="!isModalOpen" :title="modalTitle" @close="closeModal">
      <template v-if="modalAction === 'edit'">
        <form @submit.prevent="handleEdit">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              v-model="editForm.title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="editForm.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </template>
      <template v-else-if="modalAction === 'delete'">
        <p>Are you sure you want to delete this service?</p>
        <div class="flex justify-end mt-4">
          <button @click="handleDelete" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Confirm Delete</button>
        </div>
      </template>
    </ModalWrapper>
  </div>
</template>
