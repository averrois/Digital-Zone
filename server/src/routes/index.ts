import { Router } from 'express';
import serviceRoutes from './serviceRoutes';

const appRoutes = Router();

appRoutes.get('/services', serviceRoutes);

export default appRoutes;
