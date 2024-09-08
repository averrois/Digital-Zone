import type { Request, Response, NextFunction } from "express";
import Service from "../models/Service";
import type { ServiceType } from "../types";

// Fetch all Services
export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err: any) {
    console.log("Error occurred while fetching services", err?.message);
    res.status(500).json({ message: "Error occurred while fetching services" });
  }
};

// Fetch Service by ID
export const getServiceById = async (id: string): Promise<ServiceType | null> => {
  try {
    const service = await Service.findById(id);
    return service;
  } catch (err: any) {
    console.log("Error occurred on fetching service", err?.message);
    return null;
  }
};

// Update Service
// export const updateService = async (id: string, serviceData: ServiceType): Promise<ServiceType | null> => {
//   try {
//     const updatedService = await Service.findByIdAndUpdate(id, serviceData, { new: true, runValidators: true });
//     return updatedService;
//   } catch (err: any) {
//     console.log("Error occurred while updating service", err?.message);
//     return null;
//   }
// };

// // Delete Service
// export const deleteService = async (id: string): Promise<boolean> => {
//   try {
//     const result = await Service.findByIdAndDelete(id);
//     return result !== null;
//   } catch (err: any) {
//     console.log("Error occurred while deleting service", err?.message);
//     return false;
//   }
// };

export const updateService = async (id: string, serviceData: ServiceType): Promise<ServiceType | null> => {
  try {
    const service = await Service.findByIdAndUpdate(id, serviceData, { new: true })
    if (!service) {
      throw new Error('Service not found')
    }
    return service
  } catch (error) {
    console.error("Error updating service:", error)
    throw error
  }
}

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    const service = await Service.findByIdAndDelete(id)
    if (!service) {
      throw new Error('Service not found')
    }
    return true
  } catch (error) {
    console.error("Error deleting service:", error)
    throw error
  }
}

// Create Service
export const createService = async (serviceData: ServiceType): Promise<ServiceType | null> => {
  try {
    const newService = new Service(serviceData);
    const savedService = await newService.save();
    return savedService;
  } catch (err: any) {
    console.log("Error occurred while creating service", err?.message);
    return null;
  }
};