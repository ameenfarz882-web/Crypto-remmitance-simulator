import { Router } from 'express';
import { convertHandler } from '../controllers/conversionController.js';
const router = Router();
router.post('/convert', convertHandler);
export default router;
//# sourceMappingURL=conversionRoutes.js.map