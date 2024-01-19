import express from 'express';
import scheduleController from "../controller/scheduler.controller";

const router = express.Router();

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getSchedule);
router.post('/', scheduleController.addSchedule);
router.patch('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

export default router;
