import { ref } from "vue"
import type { Ref } from "vue"
import type { ServiceType } from "../types"

const BASE_URL = "/api/v1"

interface UseServicesReturn {
  services: Ref<ServiceType[]>
  error: Ref<string | null>
  loading: Ref<boolean>
  getServices: () => Promise<void>
  getServiceById: (id: string) => Promise<ServiceType | null>
  createService: (service: Omit<ServiceType, "_id">) => Promise<ServiceType | null>
  updateService: (id: string, service: Partial<ServiceType>) => Promise<ServiceType | null>
  deleteService: (id: string) => Promise<boolean>
}

export function useServices(): UseServicesReturn {
  const services = ref<ServiceType[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const handleError = (e: unknown) => {
    console.error(e)
    error.value = e instanceof Error ? e.message : "An unknown error occurred"
  }

  const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (e) {
      handleError(e)
      return null
    }
  }

  const getServices = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchWithErrorHandling(`${BASE_URL}/services`)
      if (data) services.value = data
    } finally {
      loading.value = false
    }
  }

  const getServiceById = async (id: string): Promise<ServiceType | null> => {
    loading.value = true
    error.value = null
    try {
      return await fetchWithErrorHandling(`${BASE_URL}/services/${id}`)
    } finally {
      loading.value = false
    }
  }

  const createService = async (service: Omit<ServiceType, "_id">): Promise<ServiceType | null> => {
    loading.value = true
    error.value = null
    try {
      const newService = await fetchWithErrorHandling(`${BASE_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      })
      if (newService) services.value.push(newService)
      return newService
    } finally {
      loading.value = false
    }
  }

  const updateService = async (id: string, service: Partial<ServiceType>): Promise<ServiceType | null> => {
    loading.value = true
    error.value = null
    try {
      const updatedService = await fetchWithErrorHandling(`${BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      })
      if (updatedService) {
        const index = services.value.findIndex((s) => s._id === id)
        if (index !== -1) services.value[index] = updatedService
      }
      return updatedService
    } finally {
      loading.value = false
    }
  }

  const deleteService = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null
    try {
      const result = await fetchWithErrorHandling(`${BASE_URL}/services/${id}`, {
        method: "DELETE",
      })
      if (result !== null) {
        services.value = services.value.filter((s) => s._id !== id)
        return true
      }
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    services,
    error,
    loading,
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  }
}
