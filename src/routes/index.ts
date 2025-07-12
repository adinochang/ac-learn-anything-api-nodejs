import { Router } from 'express'; 
import userRoutes from "@routes/user.routes.js";
import topicRoutes from "@routes/topic.routes.js";
import testRoutes from "@routes/test.routes.js";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/topic", topicRoutes);
router.use('/test', testRoutes);

export default router;


