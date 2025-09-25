import { Router } from "express";
import ProductController from './../controllers/ProductControlling';


const router = Router();
const controller = new ProductController();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);


export default router;
