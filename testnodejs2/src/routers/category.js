import express from "express";
import {
  creata,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getOne);
router.post("/categories",checkPermission, creata);
router.delete("/categories/:id",checkPermission, remove);
router.patch("/categories/:id",checkPermission, update);
export default router;
