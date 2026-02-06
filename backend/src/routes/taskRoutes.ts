import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  markTaskCompletion,
  updateTask,
} from "../controller/taskController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/completed", markTaskCompletion);
router.delete("/:id", deleteTask);

export default router;
