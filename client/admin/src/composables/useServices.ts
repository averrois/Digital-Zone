import axios from "axios"
import { ref } from "vue"
import type { Ref } from "vue"
import type { ServiceType } from "@/types"

const BASE_URL = "/api/v1"

interface UseServicesReturn {
  services: Ref<ServiceType[]>
  error: Ref<string | null>
  loading: Ref<boolean>
  getServices: () => Promise<void>
  getServiceById: (id: string) => Promise<ServiceType | null>
  createService: (service: Omit<ServiceType, "_id">) => Promise<ServiceType | null>
  updateService: (id: string, service: ServiceType) => Promise<ServiceType | null>
  deleteService: (id: string) => Promise<boolean>
}

export function useServices(): UseServicesReturn {
  const services = ref<ServiceType[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const handleError = (e: unknown) => {
    console.error(e)
    error.value = axios.isAxiosError(e) ? e.message : "An unknown error occurred"
  }

  const axiosWithErrorHandling = async <T>(config: any): Promise<T | null> => {
    try {
      const response = await axios(config)
      return response.data
    } catch (e) {
      handleError(e)
      return null
    }
  }

  const getServices = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await axiosWithErrorHandling<ServiceType[]>({
        method: "get",
        url: `${BASE_URL}/services`,
      })
      if (data) services.value = data
    } finally {
      loading.value = false
    }
  }

  const getServiceById = async (id: string): Promise<ServiceType | null> => {
    loading.value = true
    error.value = null
    try {
      return await axiosWithErrorHandling<ServiceType>({
        method: "get",
        url: `${BASE_URL}/services/${id}`,
      })
    } finally {
      loading.value = false
    }
  }

  const createService = async (service: Omit<ServiceType, "_id">): Promise<ServiceType | null> => {
    loading.value = true
    error.value = null
    try {
      const newService = await axiosWithErrorHandling<ServiceType>({
        method: "post",
        url: `${BASE_URL}/services`,
        data: service,
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
      const updatedService = await axiosWithErrorHandling<ServiceType>({
        method: "put",
        url: `${BASE_URL}/services/${id}`,
        body: service,
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
      const result = await axiosWithErrorHandling({
        method: "delete",
        url: `${BASE_URL}/services/${id}`,
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
