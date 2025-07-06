import { Router } from 'express'; 
import topicRoutes from "@routes/topic.routes.js";
import testRoutes from "@routes/test.routes.js";

const router: Router = Router();

router.use("/topic", topicRoutes);
router.use('/test', testRoutes);

export default router;


