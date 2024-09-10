import { Router } from 'express';
import * as serviceController from '../controllers/serviceController';

const serviceRoutes = Router();

// GET all services
serviceRoutes.get('/', serviceController.getServices);

// GET a single service by ID
// serviceRoutes.get('/:id', async (req, res, next) => {
//   const service = await serviceController.getServiceById(req.params.id);
//   if (service) {
//     res.json(service);
//   } else {
//     res.status(404).json({ message: 'Service not found' });
//   }
// });

// POST a new service
serviceRoutes.post('/', async (req, res, next) => {
  const newService = await serviceController.createService(req.body);
  if (newService) {
    res.status(201).json(newService);
  } else {
    res.status(400).json({ message: 'Failed to create service' });
  }
});

// PUT UPDATEI a service
serviceRoutes.put('/:id', async (req, res, next) => {
  try {
    const updatedService = await serviceController.updateService(req.params.id, req.body);
    if (updatedService) {
      console.log('Service Updated!', req.body);
      return res.status(200).json(updatedService);
    } else {
      return res.status(404).json({ message: 'Service not found or update failed' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a service
serviceRoutes.delete('/:id', async (req, res, next) => {
  const deleted = await serviceController.deleteService(req.params.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Service not found or delete failed' });
  }
});

export default serviceRoutes;
