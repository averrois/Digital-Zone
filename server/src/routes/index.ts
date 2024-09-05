import { Router } from 'express';
import serviceRoutes from './serviceRoutes';

const appRoutes = Router();

appRoutes.use('/services', serviceRoutes);

export default appRoutes;
