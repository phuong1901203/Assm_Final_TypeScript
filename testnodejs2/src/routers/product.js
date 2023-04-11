import express from "express";
import { creata, getAll, getOne, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products",checkPermission, creata);
router.delete("/products/:id",checkPermission, remove);
router.patch("/products/:id",checkPermission, update);
export default router;
