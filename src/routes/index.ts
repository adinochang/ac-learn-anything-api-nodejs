import { Router } from 'express'; 
import testRoutes from '@routes/test.routes.js';

const router: Router = Router();

router.use('/test', testRoutes);

export default router;


